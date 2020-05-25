const jwt = require('jsonwebtoken');
import config from '../../config';
import SoapService from './soap.service';
import axios from 'axios';

class AuthenticationService {
    
    // TODO 
    async authenticateWithG5User(server: string, user: string, password: string, encryption: string) {
        
        const servicePath = `${server}/g5-senior-services/sapiens_SyncMCWFUsers?wsdl`;
        const loginData = {
            pmUserName: user, 
            pmUserPassword: password, 
            pmEncrypted: encryption
        }
        
        const logged: any = await SoapService.execute(servicePath, 'AuthenticateJAAS', '', '', '', loginData)
        if(logged.result.pmLogged == 0) {
            return this.generateToken(`${user}${password}`);
        } else {
            return undefined;
        }
        
    }

    async authenticateWithSeniorXToken(token: string) {
        const platformUrl = 'https://platform.senior.com.br/t/senior.com.br/bridge/1.0/rest/platform/user/queries/getUser';
        
        return await axios.get(platformUrl, { headers: { Authorization : token } }).then(_ => {
            return this.generateToken(token);
        },
        _ => {
            return undefined;
        });  
    }

    generateToken(id: string) {
        const token = jwt.sign({ id: id }, config.jwtSecret, {
            expiresIn: 43200
        });
        return token;
    }
    
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