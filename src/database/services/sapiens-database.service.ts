import knexdb from '../config/database.config';

class SapiensDatabaseService {
    
    getTableData(table: any, filters: String[]): any {
        let query = knexdb(table).select('*');
        for(let filter of filters) {
            query.whereRaw(filter.toString());
        }
        
        return query.then((result: any) => {
            return result;
        });  
    }

};

export default SapiensDatabaseService;