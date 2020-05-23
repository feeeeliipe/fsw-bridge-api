import knexdb from '../database/database.config';

class DatabaseService {
    
    getTableData(table: any, filters: String[]): any {
        let query = knexdb(table).select('*');
        for(let filter of filters) {
            query.whereRaw(filter.toString());
        }
        
        return query.then((result: any) => {
            return result;
        });  
    }

    executeNativeSqlQuery(sql: String): any {
        let query = knexdb.raw(sql.toString());
        return query.then((result: any) => {
            return result;
        });
    }

};

export default DatabaseService;