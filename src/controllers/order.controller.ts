import { Request, Response } from "express";
import GetOrdersFilter from "../interfaces/get-orders-filter.interface";
import OrderService from "../services/order.service";

class OrderController {
  public async createOrder(request: Request, response: Response) {
    const orderService = new OrderService();

    const newOrder = await orderService.createOrder(request.body);

    return response.json({
      status: 201,
      data: newOrder,
      message: "Order has been created.",
    });
  }

  public async getOrder(request: Request, response: Response) {
    const orderService = new OrderService();

    const order = await orderService.getOrder(request.params.id);

    if (!order) {
      return response.json({
        status: 404,
        data: null,
        message: `Cannot find the order with id: ${request.params.id}`,
      });
    }

    return response.json({
      status: 200,
      data: order,
      message: "Order fetched.",
    });
  }

  public async getOrders(request: Request, response: Response) {
    const orderService = new OrderService();

    const filter: GetOrdersFilter = {};

    if (request.query.status) filter.status = request.query.status as string;

    const orders = await orderService.getOrders(filter);

    return response.json({
      status: 200,
      data: orders,
      message: "Orders fetched.",
    });
  }

  public async updateOrderStatus(request: Request, response: Response) {
    const orderService = new OrderService();

    const order = await orderService.getOrder(request.params.id);

    if (!order) {
      return response.json({
        status: 404,
        data: null,
        message: `Cannot find the order with id: ${request.params.id}`,
      });
    }

    await orderService.updateOrderStatus(order.id, request.body.status);

    return response.json({
      status: 200,
      data: null,
      message: "Order has been updated.",
    });
  }
}

export default OrderController;
