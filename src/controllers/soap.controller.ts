import express from 'express'
import SoapService from "../services/soap.service";

class SoapController { 

    constructor(app: any) {
        // Define routes
        const router = express.Router();
        router.post('/execute', this.executeSoapService);
        // Return routes to app
        app.use('/soap', router);
    }

    async executeSoapService(req: any, res: any) {
        const { soapserver, module, service, port } = req.query;
        const { user, password, encryption } = req.headers;
        const payload = req.body;

        // Valid all required params 
        if(!soapserver) 
            return res.status(400).send({ error: 'Server not provided.'});
        if(!module)
            return res.status(400).send({ error: 'Module not provided.'});
        if(!service)
            return res.status(400).send({ error: 'Service not provided.'});
        if(!port)
            return res.status(400).send({ error: 'Port not provided.'});
        if(!user) 
            return res.status(400).send({ error: 'User not provided.'});
        if(!password)
            return res.status(400).send({ error: 'Password not provided.'});
        if(!encryption)
            return res.status(400).send({ error: 'Encryption type not provided.'});
        
        // Prepare service name to WSDL
        let serviceToWsdl = service.split('.').join('_');
        const servicePath = `${soapserver}/g5-senior-services/${module}_Sync${serviceToWsdl}?wsdl`;
        
        // Execute SOAP service
        const result = await SoapService.execute(servicePath, port, user, password, encryption, payload);
        return res.send(result);
    }

}

export default SoapController;