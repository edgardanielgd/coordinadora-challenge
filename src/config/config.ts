export default {
    port: process.env.PORT ? parseInt( process.env.PORT ) : 3000,
    ip: process.env.HOST || '0.0.0.0'
  };