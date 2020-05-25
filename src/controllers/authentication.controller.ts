import express from 'express';
import AuthenticationService from "../services/authentication.service";

class AuthenticationController {
    
    constructor(app: any) {
        // Define routes
        const router = express.Router();
        router.post('/authenticateWithUser', this.authenticateWithG5User);
        router.post('/authenticateWithToken', this.authenticateWithSeniorXToken);
        
        // Return routes to app
        app.use('/auth', router);
    }

    async authenticateWithSeniorXToken(req: any, res: any) {
        const token = req.headers.authorization;
        if(!token)
            return res.status(400).send({ error: 'SeniorX token not provided.'});
        
        const jwtToken: any = await AuthenticationService.authenticateWithSeniorXToken(token);
        if(jwtToken == undefined) {
            return res.status(401).send({ message: 'Unauthorized user.'});
        } else {
            return res.send({ token: jwtToken });    
        }
    }

    async authenticateWithG5User(req: any, res: any) {
        const { server, user, password, encryption } = req.body;
        if(!server) 
            return res.status(400).send({ error: 'Server not provided.'});
        if(!user) 
            return res.status(400).send({ error: 'User not provided.'});
        if(!password) 
            return res.status(400).send({ error: 'Password not provided.'});
        if(!encryption) 
            return res.status(400).send({ error: 'Encryption not provided.'});

        const jwtToken = await AuthenticationService.authenticateWithG5User(server, user, password, encryption);
        if(!jwtToken) {
            return res.status(401).send({ message: 'Unauthorized user.'});
        } else {
            return res.send({ token: jwtToken });
        }
    }

}

export default AuthenticationController;