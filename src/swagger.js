const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
  openapi: "3.0.0",
  info: {
    title: "ObraFácil - Gestão Transparente de Obras Públicas",
    version: "1.0.0",
    description: "API para cadastro e acompanhamento de obras públicas"
  },
  servers: [
     { url: "http://localhost:3000", description: "Servidor local" },
     { url: "https://obraspublicas-gkg8b7brhgc5d0e8.canadacentral-01.azurewebsites.net/", description: "Servidor Azure" },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT"
      }
    }
  }
},

  apis: ["./src/routes/*.js"]
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
