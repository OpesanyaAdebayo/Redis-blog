import express from "express";
import bodyParser from "body-parser";

var app: express.Express = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));



export default app;