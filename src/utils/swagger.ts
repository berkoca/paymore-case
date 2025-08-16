import swaggerJSDoc from "swagger-jsdoc";

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Paymore Case Study",
    version: "1.0.0",
    description: "API Documentation of Paymore Case Study made by Berk Koca",
  },
  servers: [
    {
      url: "https://paymore-api.berkoca.com/api/v1",
      description: "Production Server",
    },
    {
      url: "http://localhost:4000/api/v1",
      description: "Local Test Server",
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ["./src/routes/*.ts"],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
