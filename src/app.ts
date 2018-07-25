import express from "express";
import bodyParser from "body-parser";

var app: express.Express = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


import * as homeController from './controllers/home';

app.get('/', homeController.index);

export default app;