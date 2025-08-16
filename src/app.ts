import express from "express";
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

// Create a DB connection
connectToDB();

export default server;
