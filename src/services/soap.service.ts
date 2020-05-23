const soap = require('soap');

class SoapService {
    
    execute(servicePath: string, port: string, user: string, password: string, encryption: string, payload: string) {
        return new Promise((resolve, reject) => { 
            try {
                soap.createClient(servicePath, function(err: any, client: any) {
                    if(err) {
                        resolve(`Error creating SOAP Client: ${err}`);
                    }    
                      
                    const params = {
                        user: user, 
                        password: password,
                        encryption: encryption,
                        parameters: payload
                    };
        
                    client[port](params, function(err: any, result: any) {
                        if(err) {
                            resolve(err);
                        }
                            
                        resolve(result);
                    }); 
                });    
            } catch (error) {
                reject(error);
            }
        });
    }

};

export default new SoapService();