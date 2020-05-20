import express from "express";
import SapiensDatabaseService from "../database/services/sapiens-database.service";

class SapiensDatabaseController {

    constructor(app: any) {
        // Define routes
        const router = express.Router();
        router.post('/sapiens/:table', this.getTableData);
        // Return routes to app
        app.use(router);
    }
    
    // Public methods 
    async getTableData(req: any, res: any) {
        const { table } = req.params;
        const where = this.handleFilters(table, req.body);
        const sapiensdb = new SapiensDatabaseService();
        const queryResult = await sapiensdb.getTableData(table, where);
        return res.send(queryResult);
    }
    
    // Private methods
    handleFilters(table: String, filters: any): String[] {
        let where: String[] = [];
        for(let property in filters) {
            let propertyName = property;
            let propertyValue = filters[propertyName];
            where.push(`${table}.${propertyName}=${propertyValue}`);
        }
        return where;
    }
};

export default SapiensDatabaseController;