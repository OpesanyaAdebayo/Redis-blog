import express, { Request, Response } from "express";
import { NextFunction } from 'connect';
import bodyParser from "body-parser";
import session from 'express-session';
import redis from 'redis';
import connectRedis from 'connect-redis';
import { SESSION_SECRET } from '../src/utils/secrets';

const RedisClient = redis.createClient();
const RedisStore = connectRedis(session);

var app: express.Express = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: SESSION_SECRET,
    store: new RedisStore({ client: RedisClient })
}));

import * as homeController from './controllers/home';

app.get('/', homeController.index);

export default app;