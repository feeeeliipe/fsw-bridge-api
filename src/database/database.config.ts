import knex from 'knex';
import dotenv from 'dotenv';

dotenv.config();

const knexdb = knex({
    client: 'oracledb',
    connection: {
      host : process.env.FSWBRIDGEAPI_DB_HOST,
      user : process.env.FSWBRIDGEAPI_DB_USER,
      password : process.env.FSWBRIDGEAPI_DB_PASS,
      database : process.env.FSWBRIDGEAPI_DB_database
    }
});

export default knexdb;