import mysql from 'mysql2/promise';

interface DatabaseConfig {
    dbHost : string,
    dbPort : number,
    dbUser : string,
    dbPassword : string,
    dbDatabase : string
};

export const getPool = (config : DatabaseConfig) => {
    return mysql.createPool({
        host: config.dbHost,
        port: config.dbPort,
        user: config.dbUser,
        password: config.dbPassword,
        database: config.dbDatabase,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
    });
}