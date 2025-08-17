import { mqtt, websocket } from "../app";
import OrderStatus from "../enums/order-status.enum";
import SocketEventName from "../enums/socket-event-name.enum";
import GetOrdersFilter from "../interfaces/get-orders-filter.interface";
import Order, { IOrder } from "../models/order.model";

class OrderService {
  public async createOrder(payload: IOrder) {
    const order = await Order.create(payload);

    // Send new order information through websockets (socket.io) to all listeners
    websocket.emitBroadcastEvent(SocketEventName.NEW_ORDER, order);

    return order;
  }

  public async getOrder(orderId: string) {
    const order = await Order.findById(orderId);

    return order;
  }

  public async getOrders(filter: GetOrdersFilter) {
    const orders = await Order.find(filter);

    return orders;
  }

  public async updateOrderStatus(orderId: string, status: OrderStatus) {
    await Order.findOneAndUpdate({ _id: orderId }, { status: status });

    // Send new order status to related MQTT topic
    await mqtt.publish(`orders/${orderId}/status`, JSON.stringify({ status }));
  }
}

export default OrderService;
