import express, { NextFunction, Request, Response } from "express";
import { createServer } from "http";
import swaggerUi from "swagger-ui-express";
import router from "./routes";
import { connectToDB } from "./utils/database";
import MQTT from "./utils/mqtt";
import swaggerSpec from "./utils/swagger";
import Websocket from "./utils/websocket";

// App
const app = express();
const server = createServer(app);

// Socket.io
export const websocket = new Websocket(server);

// MQTT
export const mqtt = new MQTT();

// Middlewares
app.use(express.json());

// Routes
app.use("/api/v1", router);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// 404 & Error Handlers
app.use((request: Request, response: Response) => {
  response.status(404).json({
    message: "This page doesn't exist.",
  });
});

app.use(
  (error: Error, request: Request, response: Response, next: NextFunction) => {
    response.status(500).json({
      message: "A server error occured.",
      error: error.message,
    });
  }
);

// Create a DB connection
connectToDB();

export default server;
