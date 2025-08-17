import { Router } from "express";
import OrderController from "../controllers/order.controller";

const orderRouter = Router();
const orderController = new OrderController();

/**
 * @openapi
 * /orders:
 *   post:
 *     tags:
 *      - Orders
 *     summary: Creates a new order
 *     description: Creates a new order
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              currency:
 *                type: string
 *                description: Currency of the order
 *                enum: [try, usd, eur]
 *                example: try
 *              totalPrice:
 *                type: number
 *                description: Total price of the order
 *                example: 99.99
 *              note:
 *                type: string
 *                description: Note for the order
 *                example: "This is a special order."
 *            required:
 *              - currency
 *              - totalPrice
 *     responses:
 *       201:
 *         description: Order has been created.
 */
orderRouter.post("/", orderController.createOrder);

/**
 * @openapi
 * /orders/{orderId}:
 *   get:
 *    tags:
 *      - Orders
 *    summary: Fetches an order
 *    description: Fetches an order
 *    parameters:
 *      - name: orderId
 *        in: path
 *        description: ID of order that needs to be fetched
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: Order fetched.
 */
orderRouter.get("/:id", orderController.getOrder);

/**
 * @openapi
 * /orders:
 *   get:
 *    tags:
 *      - Orders
 *    summary: Fetches an order list
 *    description: Fetches an order list
 *    parameters:
 *      - name: status
 *        in: query
 *        description: Status of orders those need to be fetched
 *        schema:
 *          type: string
 *          enum: [New, Cancelled, Done]
 *      - name: startDate
 *        in: query
 *        description: Start date of orders those need to be fetched
 *        schema:
 *          type: string
 *          format: date
 *          example: 2025-08-15
 *      - name: endDate
 *        in: query
 *        description: End date of orders those need to be fetched
 *        schema:
 *          type: string
 *          format: date
 *          example: 2025-08-22
 *    responses:
 *      200:
 *        description: Orders fetched.
 */
orderRouter.get("/", orderController.getOrders);

/**
 * @openapi
 * /orders/{orderId}:
 *   patch:
 *    tags:
 *      - Orders
 *    summary: Updates an order's status
 *    description: Updates an order's status
 *    parameters:
 *      - name: orderId
 *        in: path
 *        description: ID of order that need to be updated
 *        required: true
 *        schema:
 *          type: string
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              status:
 *                type: string
 *                description: Status of the order
 *                enum: [New, Cancelled, Done]
 *                example: Done
 *            required:
 *              - status
 *    responses:
 *      200:
 *        description: Order has been updated.
 */
orderRouter.patch("/:id", orderController.updateOrderStatus);

export default orderRouter;
