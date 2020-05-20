import express from 'express';
import SapiensDatabaseController from "./controllers/sapiensdatabase.controller";
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

new SapiensDatabaseController(app);

app.listen(3001);