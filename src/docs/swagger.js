const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: { title: 'ObraFácil API', version: '1.0.0' },
    servers: [
      { url: 'http://localhost:3000' },
      { url: "https://obraspublicas-gkg8b7brhgc5d0e8.canadacentral-01.azurewebsites.net/", description: "Servidor Azure" },

    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    },
    security: [
      {
        bearerAuth: []
      }
    ]
  },
  apis: ['./src/routes/*.js']
};

const specs = swaggerJsdoc(options);

module.exports = { swaggerUi, specs };
