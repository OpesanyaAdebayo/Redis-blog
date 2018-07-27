import { Request, Response } from "express";
import { NextFunction } from "connect";
import { validationResult } from 'express-validator/check';
import v1 from 'uuid';
import bcrypt from 'bcrypt';
import redis from 'redis';

import { RedisClient, saveUser } from '../database/setup';
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
export let postSignup = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(401).json({
            error: errors.array()
        });
    }
    RedisClient.SMEMBERS("userEmails", (err, emails: string[]) => {
        if (emails.indexOf(req.body.email) !== -1) {
            return res.status(401).json({
                error: "someone already registered with this email"
            });
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

                saveUser(userID, req.body.email, userPassword);

                req.session!.userID = userID;

                return res.status(302).json({
                    message: "User successfully created and redirected to dashboard"
                });
            });
        });

    });

};