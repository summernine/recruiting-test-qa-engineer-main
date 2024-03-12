import { PizzaOrder } from "../types";

export class ContractService {
  /**
   * Deploys a pizza contract based on the provided order.
   * @param order The pizza order object.
   * @returns A promise that resolves with the contract ID.
   */
  async deployPizzaContract(order: PizzaOrder): Promise<string> {
    if (!order) {
      throw new Error(`Order not found`);
    }
    return `0x${order.orderId}`;
  }
}
