import express from 'express';
import DatabaseController from './controllers/database.controller';
import bodyParser from 'body-parser';
import config from '../config';

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

new DatabaseController(app);

app.listen(config.port);