import express from 'express';

class AuthenticationController {
    
    constructor(app: any) {
        // Define routes
        const router = express.Router();
        router.post('/authenticate', async (req, res) => {
            console.log(req, res);
        });
        
        // Return routes to app
        app.use('/auth', router);
    }

    async authenticateWithSeniorXToken(req: any, res: any) {
        const token = req.headers.Authentication;
        console.log(token);
        console.log(req, res);
    }

    async authenticateWithG5User(req: any, res: any) {
        console.log(req, res);
    }

}

export default AuthenticationController;