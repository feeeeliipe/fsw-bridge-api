import knex from 'knex';

const knexdb = knex({
    client: 'oracledb',
    connection: {
      host : 'localhost',
      user : 'sapiens',
      password : 'sapiens',
      database : 'XE'
    }
});

export default knexdb;