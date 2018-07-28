import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import session from 'express-session';
import connectRedis from 'connect-redis';
import mongoose from 'mongoose';
import bluebird from 'bluebird';

import { RedisClient } from './database/redis';
import { MLAB_URI, SESSION_SECRET } from './utils/secrets';
// import { checkCreatePost, checkSignup } from './utils/validator';
import { checkSignup } from './utils/validator';

const RedisStore = connectRedis(session);

var app: express.Express = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

(<any>mongoose).Promise = bluebird;
mongoose.connect(MLAB_URI).then(
    () => { /** ready to use. The `mongoose.connect()` promise resolves to undefined. */ },
).catch(err => {
    console.log("MongoDB connection error. Please make sure MongoDB is running. " + err);
    // process.exit();
});

app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: SESSION_SECRET,
    store: new RedisStore({ client: RedisClient })
}));

// import * as postsController from './controllers/posts';
import * as usersController from './controllers/users';

app.get('/', usersController.getHome);
app.get('/logout', usersController.getLogOut);
app.get('/signup', usersController.getSignup);
app.post('/signup', checkSignup, usersController.postSignup);
// app.post('/post', checkCreatePost, postsController.createPost);

app.use((req: Request, res: Response) => {
    if (req.path !== '/' && req.path !== '/login' && req.path !== '/signup' && req.path !== '/post') {
        res.sendStatus(404)
    }
});

export default app;