require('dotenv').config();

export interface Config {
  port : number,
  ip : string,
  env : string,
  jwtSecret : string,
  geocodingApiBase : string,
  dbHost : string,
  dbPort : number,
  dbUser : string,
  dbPassword : string,
  dbDatabase : string,
}

export const config : Config = {
  env : process.env.ENV || 'dev',
  port: process.env.APP_PORT ? parseInt( process.env.APP_PORT ) : 3000,
  ip: process.env.APP_HOST || '0.0.0.0',
  jwtSecret : process.env.JWT_SECRET || 'secret',
  geocodingApiBase : 'https://api.geoapify.com/v1/geocode/search',
  dbHost : process.env.DB_HOST || '',
  dbPort : process.env.DB_PORT ? parseInt( process.env.DB_PORT ) : 3306,
  dbUser : process.env.DB_USER || '',
  dbPassword : process.env.DB_PASSWORD || '',
  dbDatabase : process.env.DB_DATABASE || '',
}