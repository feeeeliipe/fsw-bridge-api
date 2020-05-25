import express from 'express';
import DatabaseController from './controllers/database.controller';
import bodyParser from 'body-parser';
import config from '../config';
import SoapController from './controllers/soap.controller';
import AuthenticationController from './controllers/authentication.controller';

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

new DatabaseController(app);
new SoapController(app);
new AuthenticationController(app);

app.listen(config.port, () => {
    console.log(`[FSW-BRIDGE-API] Server running on port: ${config.port}`);
});