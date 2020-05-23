const config = {    
    // General configs
    port: 3001,
    authenticationType: 'G5', // (G5, SENIORX)
    jwtSecret: '11449503587fcead090520c4124143e3',

    // Database configs
    database: {
        host: 'localhost',
        user: 'sapiens',
        password: 'sapiens',
        database: 'XE'
    },
}

export default config;