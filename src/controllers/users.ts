import { Request, Response } from "express";
import { NextFunction } from "connect";
import { validationResult } from 'express-validator/check';
import v1 from 'uuid';
import bcrypt from 'bcrypt';
import redis from 'redis';

import { RedisClient } from '../database/setup';

export let getHome = (req: Request, res: Response) => {
  let { userID } = req.session!;
  if (userID) {
      return res
          .status(302)
          .json({ message: "Redirected to user dashboard" });
  }
    return res.status(200).json({ message: "On the home page" });
};
export let getSignup = (req: Request, res: Response) => {
    let { userID } = req.session!;
    if (userID) {
        return res
          .status(302)
          .json({ message: "Redirected to user dashboard" });
    }
    return res.status(200).json({ message: "On the signup page" });
};
export let postSignup = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(401).json({error: errors.array()});
    }

    let userID = v1();
    bcrypt.genSalt(10, (err, salt) => {
      if (err) {
        return next(err);
      }
      bcrypt.hash(req.body.password, salt, (err, hash) => {
        if (err) {
          return next(err);
          }
          let userPassword: string = hash;

          RedisClient.HSET(`user:${userID}`, "id", userID, redis.print);
          RedisClient.HSET(`user:${userID}`, "email", req.body.email, redis.print);
          RedisClient.HSET(`user:${userID}`, "password", userPassword, redis.print);

          req.session!.userID = userID;

          return res.status(302).json({ message: "User successfully created and redirected to dashboard" });
      });
    });

};

