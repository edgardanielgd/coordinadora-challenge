require('dotenv').config();

export interface Config {
  port : number,
  ip : string,
  env : string,
  jwtSecret : string,
  geocodingApiUrl : string,
  geocodingApiKey : string,
  dbHost : string,
  dbPort : number,
  dbUser : string,
  dbPassword : string,
  dbDatabase : string,
  smtpServer : string,
  smtpPort : number,
  smtpUsername : string,
  smtpPassword : string,
}

export const config : Config = {
  env : process.env.ENV || 'dev',
  port: process.env.APP_PORT ? parseInt( process.env.APP_PORT ) : 3000,
  ip: process.env.APP_HOST || '0.0.0.0',
  jwtSecret : process.env.JWT_SECRET || 'secret',
  geocodingApiUrl : 'https://api.geoapify.com/v1/geocode/search',
  geocodingApiKey : process.env.GEOAPI_KEY || '',
  dbHost : process.env.DB_HOST || '',
  dbPort : process.env.DB_PORT ? parseInt( process.env.DB_PORT ) : 3306,
  dbUser : process.env.DB_USER || '',
  dbPassword : process.env.DB_PASSWORD || '',
  dbDatabase : process.env.DB_DATABASE || '',
  smtpServer : process.env.SMTP_MAIL_SERVER || '',
  smtpPort : process.env.SMTP_MAIL_PORT ? parseInt( process.env.SMTP_MAIL_PORT ) : 587,
  smtpUsername : process.env.SMTP_MAIL_USERNAME || '',
  smtpPassword : process.env.SMTP_MAIL_PASSWORD || '',
}