import { OrdersService } from "../src/services/orders";
import { IngredientName, OrderPhase, PizzaOrder, PizzaStatus } from "../src/types";
import { OrderMockData } from '../src/mock/orders.mock';

describe('Orders', () => {
  let ordersService: OrdersService;

  beforeEach(() => {
    ordersService = new OrdersService();
  });

  describe('List orders', () => {
    it('should list all orders', async () => {
      const orderServiceWithOrders = new OrdersService(OrderMockData);
      const receivedOrders = await orderServiceWithOrders.getOrdersQueue();

      expect(receivedOrders).toEqual(OrderMockData);
    });

    it('should return empty for empty orders', async () => {
      const receivedOrders = await ordersService.getOrdersQueue();

      expect(receivedOrders).toEqual([]);
    });

    it('should return empty for undefined orders', async () => {
      const orderServiceWithOrders = new OrdersService(undefined as any);
      const receivedOrders = await orderServiceWithOrders.getOrdersQueue();

      expect(receivedOrders).toEqual([]);
    });

    it('should return empty for null orders', async () => {
      const orderServiceWithOrders = new OrdersService(null as any);
      const receivedOrders = await orderServiceWithOrders.getOrdersQueue();

      expect(receivedOrders).toEqual(null);
    });
  });

  describe('Add orders', () => {
    it('should add 1 order', async () => {
      //const firstOrder = OrderMockData[0]
      const orderServiceWithOrders = new OrdersService([OrderMockData[0]]);
      orderServiceWithOrders.addOrder(OrderMockData[1])
      const receivedOrders = await orderServiceWithOrders.getOrdersQueue();

      expect(receivedOrders).toContain(OrderMockData[1]);
    });

    it('should add multiple orders', async () => {
      const orderServiceWithOrders = new OrdersService([OrderMockData[0]]);
      // Pass multiple orders
      orderServiceWithOrders.addOrders([OrderMockData[1], OrderMockData[2]])
      const receivedOrders = await orderServiceWithOrders.getOrdersQueue();

      expect(receivedOrders).toContain(OrderMockData[1]);
      expect(receivedOrders).toContain(OrderMockData[2]);
    });
  });

  describe('Get order id', () => {
    it('should return order id', async () => {
      const orderDetails = await ordersService.getOrderById(OrderMockData[0].orderId)

      //Should return order id details like order status, order phase, ingredients
    });
  })

  describe('Update order details', () => {
    it('should update order id', async () => {
      const updateOrderId = { orderId: '1789' }

      const orderServiceWithOrders = new OrdersService([OrderMockData[0]]);
      orderServiceWithOrders.updateOrder(OrderMockData[0].orderId, updateOrderId)
      const receivedOrders = await orderServiceWithOrders.getOrdersQueue();

      expect(receivedOrders[0].orderId).toEqual(updateOrderId.orderId)
    });

    it('should update order phase', async () => {
      const updateOrderPhase = { orderPhase: OrderPhase.Cooking }

      const orderServiceWithOrders = new OrdersService([OrderMockData[0]]);
      orderServiceWithOrders.updateOrder(OrderMockData[0].orderId, updateOrderPhase)
      const receivedOrders = await orderServiceWithOrders.getOrdersQueue();

      expect(receivedOrders[0].orderPhase).toEqual(updateOrderPhase.orderPhase)
    });

    it('should update order status', async () => {
      const updateOrderPhase = { status: PizzaStatus.Prepared }

      const orderServiceWithOrders = new OrdersService([OrderMockData[0]]);
      orderServiceWithOrders.updateOrder(OrderMockData[0].orderId, updateOrderPhase)
      const receivedOrders = await orderServiceWithOrders.getOrdersQueue();

      expect(receivedOrders[0].status).toEqual(updateOrderPhase.status)
    });

    it('should update order ingredients', async () => {
      const updateIngredients: Partial<PizzaOrder> = {
        requiredIngredients: [{ name: IngredientName.flour, quantity: 8 }]
      };

      const orderServiceWithOrders = new OrdersService([OrderMockData[0]]);
      orderServiceWithOrders.updateOrder(OrderMockData[0].orderId, updateIngredients)
      const receivedOrders = await orderServiceWithOrders.getOrdersQueue();

      expect(receivedOrders[0].requiredIngredients).toBe(updateIngredients.requiredIngredients)
    });
  })

});