import { ContractService } from "../src/services/contract";
import { IngredientName, OrderPhase, PizzaOrder, PizzaStatus } from "../src/types";

describe('Contract', () => {
  let contractService: ContractService;

  beforeEach(() => {
    contractService = new ContractService();
  })

  describe('Deploy pizza contract', () => {
    it('should deploy pizza contract successfully', async () => {
      const order: PizzaOrder = {
        orderId: '1234',
        orderPhase: OrderPhase.Ready,
        status: PizzaStatus.Available,
        requiredIngredients: [{
          name: IngredientName.flour,
          quantity: 4
        },
        {
          name: IngredientName.tomato,
          quantity: 2
        }
        ]
      }

      const contractId = await contractService.deployPizzaContract(order);

      expect(contractId).toBe(`0x${order.orderId}`)
    })

    it('should show error for null orderId', async () => {
      await expect(contractService.deployPizzaContract(null as any)).rejects.toThrow('Order not found');
    })

    it('should show error for undefined orderId', async () => {
      await expect(contractService.deployPizzaContract(undefined as any)).rejects.toThrow('Order not found');
    })
  })
})