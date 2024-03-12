import { IngredientName, OrderPhase, PizzaOrder, PizzaStatus } from "./types";
import { IngredientsService } from "./services/ingredients";
import { ContractService } from "./services/contract";
import { PizzaService } from "./services/pizza";
import { OrdersService } from "./services/orders";

const ordersQueue: PizzaOrder[] = [
  {
    orderId: "123",
    orderPhase: OrderPhase.Ready,
    status: PizzaStatus.Available,
    requiredIngredients: [
      {
        name: IngredientName.flour,
        quantity: 50,
      },
      {
        name: IngredientName.tomato,
        quantity: 30,
      },
      {
        name: IngredientName.mozzarella,
        quantity: 50,
      },
    ],
  },
  {
    orderId: "456",
    orderPhase: OrderPhase.Ready,
    status: PizzaStatus.Available,
    requiredIngredients: [
      {
        name: IngredientName.flour,
        quantity: 60,
      },
      {
        name: IngredientName.tomato,
        quantity: 30,
      },
      {
        name: IngredientName.mozzarella,
        quantity: 50,
      },
    ],
  },
];

const contractService = new ContractService();
const ingredientsService = new IngredientsService();
const ordersService = new OrdersService();
const pizzaService = new PizzaService(
  contractService,
  ingredientsService,
  ordersService
);
const placeOrders = async (_ordersQueue: PizzaOrder[]): Promise<void> => {
  ordersService.addOrders(_ordersQueue);
  const ordersPromise = _ordersQueue.map((order) => {
    console.log(`processing order ${order.orderId}`);
    pizzaService.processPizzaOrder(order.orderId);
  });
  Promise.all(ordersPromise);

  console.log("All orders sent to kitchen Partner!");
};

placeOrders(ordersQueue);
