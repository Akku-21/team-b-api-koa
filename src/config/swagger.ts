import swaggerJSDoc from 'swagger-jsdoc';
import path from 'path';

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'UUID Validator API',
    version: '1.0.0',
    description: 'API for validating and managing UUIDs with JSON schemas'
  },
  servers: [
    {
      url: 'https://team-b-api-koa-production.up.railway.app',
      description: 'Local development server'
    }
  ]
};

const options = {
  swaggerDefinition,
  apis: [
    path.join(__dirname, '../routes/*'),
    path.join(__dirname, '../controllers/*')
  ]
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
