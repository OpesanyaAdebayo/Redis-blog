import { Request, Response } from "express";
import { NextFunction } from "connect";
import { WriteError } from 'mongodb';
import { default as Post } from '../models/Post';
import { default as User, userType } from '../models/User';
export let createPost = (req: Request, res: Response, next: NextFunction) => {
    if (!req.session!.userID) {
        return res
            .status(403)
            .json({
                message: "You are not permitted to carry out this action."
            });
    }

    User.findById(req.session!.userID, (err, user: userType) => {

        if (err) {
            return next(err);
        }

        if (!user) {
            res.status(400).json({ error: "cannot find user" });
        }

        for (let i = 0; i < user.posts!.length; i++) {
            if (user.posts![i].title == req.body.title) {
                return res.status(401).json({ error: "You have already saved a post with this title." });
            }
        }

        let post = new Post({
            tile: req.body.tile,
            poster: req.session!.userID
        });

        post.save()
            .then(savedPost => {
                user.posts!.push({ id: savedPost._id.toString(), title: req.body.title });
                user.save((err: WriteError) => {
                    if (err) {
                        return next(err);
                    }
                    return res
                        .status(302)
                        .json({
                            message:
                                "redirected to user dashboard"
                        });
                })
            })
            .catch(err => {
                return next(err);
            })
    })

}