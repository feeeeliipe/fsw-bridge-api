import knex from 'knex';
import config from '../../config';

const knexdb = knex({
    client: 'oracledb',
    connection: {
      host : config.database.host,
      user : config.database.user,
      password : config.database.password,
      database : config.database.database
    }
});

export default knexdb;