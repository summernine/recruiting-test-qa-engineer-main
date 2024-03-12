import { ContractService } from "./contract";
import { IngredientsService } from "./ingredients";
import { OrdersService } from "./orders";
import { OrderPhase, PizzaStatus } from "../types";

export class PizzaService {
  constructor(
    private contractService: ContractService,
    private ingredientsService: IngredientsService,
    private orderService: OrdersService
  ) {}

  private async _bakePizza(orderId: string): Promise<void> {
    const order = await this.orderService.getOrderById(orderId);
    if (!order) {
      throw new Error(`_bakePizza Order ${orderId} not found`);
    }
    await Promise.resolve();
  }

  private async _collectIngredients(orderId: string): Promise<void> {
    const order = await this.orderService.getOrderById(orderId);
    if (!order) {
      throw new Error(`_collectIngredients Order ${orderId} not found`);
    }
    return this.ingredientsService.updateStockAll(order.requiredIngredients);
  }

  private async _updateStatus(
    orderId: string,
    updates: { orderPhase?: OrderPhase; status: PizzaStatus }
  ): Promise<void> {
    const order = await this.orderService.getOrderById(orderId);
    if (!order) {
      throw new Error(`_updateStatus Order ${orderId} not found`);
    }

    await this.orderService.updateOrder(orderId, updates);
  }

  private async _checkForMissingIngredients(orderId: string): Promise<void> {
    const order = await this.orderService.getOrderById(orderId);
    if (!order) {
      throw new Error(`_checkForMissingIngredients Order ${orderId} not found`);
    }

    const isAvailableAll = this.ingredientsService.isAvailableAll(
      order.requiredIngredients
    );
    if (!isAvailableAll) {
      throw new Error(`Missing ingredients for order ${orderId}`);
    }
  }

  public async processPizzaOrder(orderId: string): Promise<void> {
    const pizza = await this.orderService.getOrderById(orderId);
    if (!pizza || pizza.orderPhase !== OrderPhase.Ready) {
      throw new Error(`Pizza order ${orderId} is not ready to be cooked`);
    }
    if (pizza.status !== PizzaStatus.Available) {
      throw new Error(`Pizza for ${orderId} is not available to be cooked`);
    }

    await this._checkForMissingIngredients(orderId);
    
    await this._updateStatus(orderId, {
      orderPhase: OrderPhase.Cooking,
      status: PizzaStatus.Pending,
    });

    this.contractService
      .deployPizzaContract(pizza)
      .then(async () => {
        try {
          await this._collectIngredients(orderId);
          await this._bakePizza(orderId);
          await this._updateStatus(orderId, {
            orderPhase: OrderPhase.Completed,
            status: PizzaStatus.Prepared,
          });
        } catch (error) {
          await this._updateStatus(orderId, { status: PizzaStatus.Failed });
        }
      })
      .catch(async (error) => {
        await this._updateStatus(orderId, { status: PizzaStatus.Failed });
      });
  }
}
