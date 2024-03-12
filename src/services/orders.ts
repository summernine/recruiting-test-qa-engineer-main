import { PizzaOrder } from "../types";

export class OrdersService {
  private ordersQueue: PizzaOrder[];
  constructor(orders = [] as PizzaOrder[]) {
    this.ordersQueue = orders;
  }

  // Public functions
  async getOrdersQueue() {
    return this.ordersQueue;
  }

  addOrder(order: PizzaOrder) {
    this.ordersQueue.push(order);
  }

  addOrders(orders: PizzaOrder[]) {
    this.ordersQueue.push(...orders);
  }

  async getOrderById(orderId: string) {
    return this.ordersQueue.find((order) => order.orderId === orderId);
  }

  async updateOrder(orderId: string, updates: Partial<PizzaOrder>) {
    const order = this.ordersQueue.find((order) => order.orderId === orderId);
    if (order) {
      Object.assign(order, updates);
    }
    return order;
  }
}
