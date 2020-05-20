import express from "express";
import SapiensDatabaseService from "../database/services/sapiens-database.service";

class SapiensDatabaseController {

    constructor(app: any) {
        // Define routes
        const router = express.Router();
        router.post('/sapiens/nativeSQL', this.nativeSql.bind(this));
        router.post('/sapiens/:table', this.getTableData.bind(this));
        // Return routes to app
        app.use(router);
    }
    
    // Public methods 
    async getTableData(req: any, res: any) {
        const { table } = req.params;
        const where = this.handleFilters(req.body.filters);
        const sapiensdb = new SapiensDatabaseService();
        const queryResult = await sapiensdb.getTableData(table, where);
        return res.send(queryResult);
    }

    async nativeSql(req: any, res: any) {
        const { sql } = req.body;
        const sapiensdb = new SapiensDatabaseService();
        const queryResult = await sapiensdb.executeNativeSqlQuery(sql);
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

export default SapiensDatabaseController;