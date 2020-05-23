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

}

export default AuthenticationController;