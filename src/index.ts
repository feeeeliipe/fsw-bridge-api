import express from 'express';
import dotenv from 'dotenv';
import DatabaseController from './controllers/database.controller';
import bodyParser from 'body-parser';
import SoapController from './controllers/soap.controller';
import AuthenticationController from './controllers/authentication.controller';

dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

new DatabaseController(app);
new SoapController(app);
new AuthenticationController(app);

const port = process.env.FSWBRIDGEAPI_PORT
app.listen(port, () => {
    console.log(`[FSW-BRIDGE-API] Server running on port: ${port}`);
});