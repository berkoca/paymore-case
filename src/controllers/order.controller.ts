import { Request, Response } from "express";
import GetOrdersFilter from "../interfaces/get-orders-filter.interface";
import OrderService from "../services/order.service";

class OrderController {
  public async createOrder(request: Request, response: Response) {
    const orderService = new OrderService();

    const newOrder = await orderService.createOrder(request.body);

    return response.status(201).json({
      data: newOrder,
      message: "Order has been created.",
    });
  }

  public async getOrder(request: Request, response: Response) {
    const orderService = new OrderService();

    const order = await orderService.getOrder(request.params.id);

    if (!order) {
      return response.status(404).json({
        data: null,
        message: `Cannot find the order with id: ${request.params.id}`,
      });
    }

    return response.json({
      data: order,
      message: "Order fetched.",
    });
  }

  public async getOrders(request: Request, response: Response) {
    const orderService = new OrderService();

    const filter: GetOrdersFilter = {};

    if (request.query?.status) filter.status = request.query.status as string;

    if (request.query?.startDate && !request.query?.endDate) {
      filter.createdAt = {
        $gte: new Date(request.query.startDate as string).toISOString(),
      };
    }

    if (!request.query?.startDate && request.query?.endDate) {
      filter.createdAt = {
        $lte: new Date(request.query.endDate as string).toISOString(),
      };
    }

    if (request.query?.startDate && request.query?.endDate) {
      filter.createdAt = {
        $gte: new Date(request.query.startDate as string).toISOString(),
        $lte: new Date(request.query.endDate as string).toISOString(),
      };
    }

    const orders = await orderService.getOrders(filter);

    return response.json({
      data: orders,
      message: "Orders fetched.",
    });
  }

  public async updateOrderStatus(request: Request, response: Response) {
    const orderService = new OrderService();

    const order = await orderService.getOrder(request.params.id);

    if (!order) {
      return response.status(404).json({
        data: null,
        message: `Cannot find the order with id: ${request.params.id}`,
      });
    }

    await orderService.updateOrderStatus(order.id, request.body.status);

    return response.json({
      data: null,
      message: "Order has been updated.",
    });
  }
}

export default OrderController;
