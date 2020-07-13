import jsonwebtoken from 'jsonwebtoken';
import dotenv from 'dotenv';
import config from '../../config';

dotenv.config();

class AuthenticationMiddleware {
    verifyToken(req: any, res: any, next: any) {

        const token = req.headers.authorization;
        
        if(!token){ 
            return res.status(401).send({ error: 'No token provided.'});
        }

        // Verifica se o token é valido 
        jsonwebtoken.verify(token, config.jwtSecret, (err: any, _: any) => {
            if(err) {
                return res.status(401).send({ error: 'Invalid token'} );
            }
            return next();
        });
    }

}

export default new AuthenticationMiddleware();