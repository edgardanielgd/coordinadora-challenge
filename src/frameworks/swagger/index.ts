import swaggerJSDoc from 'swagger-jsdoc';
import path from 'path';

const isProd = process.env.NODE_ENV === 'production';

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Shippings Swagger Docs',
      version: '1.0.0',
      description: 'Swagger docs for shippings project',
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: [
    isProd
    ? path.join(__dirname, '/**/*.js') // In Docker, look in dist/
    : './src/**/*.ts'
  ]
};

export const swaggerSpec = swaggerJSDoc(options);