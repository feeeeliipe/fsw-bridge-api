import express from "express";
import DatabaseService from "../services/database.service";
import authenticationMiddleware from "../middlewares/authentication.middleware";

class DatabaseController {

    constructor(app: any) {
        // Define authenticationMiddleware 
        app.use('/database', authenticationMiddleware.verifyToken);
        // Define routes
        const router = express.Router();
        router.post('/nativeSQL', this.nativeSql.bind(this));
        router.post('/:table', this.getTableData.bind(this));
        // Return routes to app
        app.use('/database', router);
    }
    
    // Public methods 
    async getTableData(req: any, res: any) {
        const { table } = req.params;
        const filters = this.handleFilters(req.body.filters);
        const queryResult = await DatabaseService.getTableData(table, filters);
        return res.send(queryResult);
    }

    async nativeSql(req: any, res: any) {
        const { sql } = req.body;
        const queryResult = await DatabaseService.executeNativeSqlQuery(sql);
        return res.send(queryResult);
    }
    
    // Private methods
    handleFilters(filters: any): String[] {
        let where: String[] = [];
        for(let property in filters) {
            let propertyName = property;
            let propertyValue = filters[propertyName];
            where.push(`${propertyName}=${propertyValue}`);
        }
        return where;
    }
};

export default DatabaseController;