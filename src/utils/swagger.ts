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
      url: "http://localhost:3000/api/v1",
      description: "Test Server",
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ["./src/routes/*.ts"],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
