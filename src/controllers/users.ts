import { Request, Response } from "express";
import { NextFunction } from "connect";
import { validationResult } from 'express-validator/check';

import redis from 'redis';

import { RedisClient, saveUser } from '../database/redis';
import { default as User, userType } from '../models/User';
export let getHome = (req: Request, res: Response, next: NextFunction) => {
    if (req.session!.userID) {
        return res
            .status(302)
            .json({
                message: "Redirected to user dashboard"
            });
    }
    return res.status(200).json({
        message: "On the home page"
    });
};
export let getLogin = (req: Request, res: Response) => {
    if (req.session!.userID) {
        return res
            .status(302)
            .json({
                message: "Redirected to user dashboard"
            });
    }
    return res.status(200).json({
        message: "On the login page"
    });
};
export let getSignup = (req: Request, res: Response) => {
    if (req.session!.userID) {
        return res
            .status(302)
            .json({
                message: "Redirected to user dashboard"
            });
    }
    return res.status(200).json({
        message: "On the signup page"
    });
};
export let getLogOut = (req: Request, res: Response, next: NextFunction) => {
    if (req.session!.userID) {
        return req.session!.destroy((err) => {
            return res
                .status(200)
                .json({
                    message: "Successfully logged out"
                });
        });
    }
    return res.status(403).json({
        message: "You aren't signed in"
    });
};

export let postLogin = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(401).json({
      error: errors.array()
    });
  }

  const user = new User({
    email: req.body.email,
    password: req.body.password
  });

  User.findOne({ email: req.body.email }, (err, existingUser: any) => {
    if (err) {
      return next(err);
    }
    if (existingUser) {
      existingUser.comparePassword(
        req.body.password,
        (err: Error, isMatch: boolean) => {
          if (err) {
            return next(err);
          }
          if (isMatch) {
            req.session!.userID = existingUser._id.toString();
            return res
              .status(302)
              .json({ message: "redirected to user dashboard" });
          } else {
            return res
              .status(401)
              .json({ error: "Incorrect username and/or password." });
          }
        }
      );
    } else {
      return res
        .status(401)
        .json({ error: "Incorrect username and/or password." });
    }
  });
};
export let postSignup = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(401).json({
            error: errors.array()
        });
    }

    const user = new User({
        email: req.body.email,
        password: req.body.password
    });

    User.findOne({ email: req.body.email }, (err, existingUser) => {
        if (err) return next(err);
        if (existingUser) {
            return res
                .status(401)
                .json({ error: "account with that email already exists." });
        }
        user
            .save()
            .then(savedUser => {
                req.session!.userID = savedUser._id.toString();
                return res.status(302).json({ message: "redirected to user dashboard" });
            })
            .catch(err => {
                if (err) return next(err);
            });
    });

};