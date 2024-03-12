import { ContractService } from "../src/services/contract";
import { IngredientsService } from "../src/services/ingredients";
import { OrdersService } from "../src/services/orders";
import { PizzaService } from "../src/services/pizza";
import { OrderMockData, IngredientsMockData } from '../src/mock/orders.mock';
import { IngredientName, OrderPhase, PizzaOrder, PizzaStatus } from "../src/types";

jest.mock('../src/services/orders');

describe('Pizza', () => {
  let pizzaService: PizzaService;

  beforeEach(() => {
    const contractService = new ContractService();
    const ingredientsService = new IngredientsService();
    const ordersService = new OrdersService();
    pizzaService = new PizzaService(
      contractService,
      ingredientsService,
      ordersService
    );
  })

  afterEach(() => {
    jest.clearAllMocks();
  })

  describe('Bake pizza', () => {
    it('should throw error for non-existing orderId', async () => {
      const orderId = '8088';
      let error;

      try {
        await pizzaService['_bakePizza'](orderId)
      } catch (err) {
        error = err
      }

      expect(error).toBeTruthy();
    })

    it('should bake pizza', () => {
      const orderId = OrderMockData[0].orderId;
      (OrdersService as jest.MockedClass<typeof OrdersService>).prototype.getOrderById.mockResolvedValueOnce(OrderMockData[0]);

      expect(pizzaService['_bakePizza'](orderId)).toBeTruthy();
    })
  })

  describe('Collect pizza ingredients', () => {
    it('should throw error for non-existing orderId', async () => {
      const orderId = '8088';
      let error;

      try {
        await pizzaService['_collectIngredients'](orderId)
      } catch (err) {
        error = err;
      }

      expect(error).toBeTruthy();
    })

    it('should update ingredients', async () => {
      const orderId = OrderMockData[0].orderId;
      const order = OrderMockData[0];

      (OrdersService as jest.MockedClass<typeof OrdersService>).prototype.getOrderById.mockResolvedValueOnce(order);
      const updateStockAllMock = jest.spyOn(IngredientsService.prototype, 'updateStockAll').mockResolvedValueOnce(undefined as never);
      const getStock = jest.spyOn(IngredientsService.prototype, 'getStock').mockResolvedValueOnce(undefined as never);

      await pizzaService['_collectIngredients'](orderId);

      expect(updateStockAllMock).toHaveBeenCalledWith(order.requiredIngredients);
    })
  })

  describe('Update order status', () => {
    it('should throw error for non-existing orderId', async () => {
      const orderId = '8088';
      const updateOrderPhaseAndStatus = { orderPhase: OrderPhase.Cooking, status: PizzaStatus.Prepared };
      let error;

      try {
        await pizzaService['_updateStatus'](orderId, updateOrderPhaseAndStatus)
      } catch (err) {
        error = err;
      }

      expect(error).toBeTruthy();
    })

    it('should update order phase and order status', async () => {
      // Updates status from { orderPhase: OrderPhase.Ready, status: PizzaStatus.Available } 
      // to { orderPhase: OrderPhase.Cooking, status: PizzaStatus.Prepared }
      const orderId = OrderMockData[0].orderId;
      const order = OrderMockData[0];
      const updateOrderPhaseAndStatus = { orderPhase: OrderPhase.Cooking, status: PizzaStatus.Prepared };

      (OrdersService as jest.MockedClass<typeof OrdersService>).prototype.getOrderById.mockResolvedValueOnce(order);
      (OrdersService as jest.MockedClass<typeof OrdersService>).prototype.updateOrder.mockResolvedValueOnce(order);

      const updateOrder = jest.spyOn(OrdersService.prototype, 'updateOrder').mockResolvedValueOnce(undefined as never);

      await pizzaService['_updateStatus'](orderId, updateOrderPhaseAndStatus);

      expect(updateOrder).toHaveBeenCalledWith(orderId, updateOrderPhaseAndStatus);
    })

    it('should update order phase and order status', async () => {
      // Updates status from { orderPhase: OrderPhase.Cooking, status: PizzaStatus.Prepared } 
      // to { orderPhase: OrderPhase.Completed, status: PizzaStatus.Prepared }
      const orderId = OrderMockData[2].orderId;
      const order = OrderMockData[2];
      const updateOrderPhaseAndStatus = { orderPhase: OrderPhase.Completed, status: PizzaStatus.Prepared };

      (OrdersService as jest.MockedClass<typeof OrdersService>).prototype.getOrderById.mockResolvedValueOnce(order);
      (OrdersService as jest.MockedClass<typeof OrdersService>).prototype.updateOrder.mockResolvedValueOnce(order);

      const updateOrder = jest.spyOn(OrdersService.prototype, 'updateOrder').mockResolvedValueOnce(undefined as never);

      await pizzaService['_updateStatus'](orderId, updateOrderPhaseAndStatus);

      expect(updateOrder).toHaveBeenCalledWith(orderId, updateOrderPhaseAndStatus);
    })
  })

  describe('Check missing ingredients', () => {
    it('should throw error for non-existing orderId', async () => {
      const orderId = '8088';
      let error;

      try {
        await pizzaService['_checkForMissingIngredients'](orderId)
      } catch (err) {
        error = err;
      }

      expect(error).toBeTruthy();
    })

    it('should check missing ingredients', async () => {
      const orderId = OrderMockData[1].orderId;
      const order = OrderMockData[1];
      let error;

      (OrdersService as jest.MockedClass<typeof OrdersService>).prototype.getOrderById.mockResolvedValueOnce(order);

      const isIngredientAvailable = jest.spyOn(IngredientsService.prototype, 'isAvailableAll').mockResolvedValueOnce(undefined as never);

      try {
        await pizzaService['_checkForMissingIngredients'](orderId)
      } catch (err) {
        error = err;
      }

      expect(isIngredientAvailable).toHaveBeenCalledWith(order.requiredIngredients);
    })
  })

  describe('Process pizza order', () => {
    it.skip('should process order', async () => {
      // TO DO
    });

    it('should throw error for non-existing orderId', async () => {
      const orderId = '8088';
      let error;

      try {
        await pizzaService.processPizzaOrder(orderId)
      } catch (err) {
        error = err;
      }
      // Error: Pizza order is not ready to be cooked
      expect(error).toBeTruthy();
    })

    it('should throw error when pizza is not available to be cooked', async () => {
      const orderId = OrderMockData[3].orderId;
      const order = OrderMockData[3];
      let error;

      (OrdersService as jest.MockedClass<typeof OrdersService>).prototype.getOrderById.mockResolvedValueOnce(order);

      try {
        await pizzaService.processPizzaOrder(orderId)
      } catch (err) {
        error = err;
      }
      // Error: Pizza order is not available to be cooked
      expect(error).toBeTruthy();
    })

    it('should throw error when pizza is not ready to be cooked', async () => {
      const orderId = OrderMockData[4].orderId;
      const order = OrderMockData[4];
      let error;

      (OrdersService as jest.MockedClass<typeof OrdersService>).prototype.getOrderById.mockResolvedValueOnce(order);

      try {
        await pizzaService.processPizzaOrder(orderId)
      } catch (err) {
        error = err;
      }
      // Error: Pizza order is not ready to be cooked
      expect(error).toBeTruthy();
    })
  })
})