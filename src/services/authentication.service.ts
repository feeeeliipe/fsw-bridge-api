
const jwt = require('jsonwebtoken');
import config from '../../config';

class AuthenticationService {
    
    // TODO 
    authenticateWithG5User(user: string, password: string, encryption: string) {
        // faz uma chamada para o serviço de autenticação da G5 e gera um token JWT
        console.log(encryption);
        return this.generateToken(`${user}${password}`);
    }

    authenticateWithSeniorXToken(token: string) {
        // faz uma chamada para um endpoint da plataforma e se o token for válido, gera um token JWT
        return this.generateToken(token);
    }

    generateToken(id: string) {
        const token = jwt.sign({ id: id }, config.jwtSecret, {
            expiresIn: 43200
        });
        return token;
    }
    
    // TO DO 
    isTokenValid(token: string) {
        return jwt.verify(token, config.jwtSecret, (err: any, _: any) => {
            if(err) {
                return false;
            } else {
                return true;
            }
        });
    };
};

export default new AuthenticationService();