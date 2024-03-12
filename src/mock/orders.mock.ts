import { Ingredient, IngredientName, OrderPhase, PizzaOrder, PizzaStatus } from "../../src/types";

export const OrderMockData = [{
  orderId: '1000',
  orderPhase: OrderPhase.Ready,
  status: PizzaStatus.Available,
  requiredIngredients: [{
    name: IngredientName.flour,
    quantity: 100
  },
  {
    name: IngredientName.tomato,
    quantity: 100
  }]
}, {
  orderId: '1222',
  orderPhase: OrderPhase.Ready,
  status: PizzaStatus.Available,
  requiredIngredients: [{
    name: IngredientName.flour,
    quantity: 1
  },
  {
    name: IngredientName.tomato,
    quantity: 1
  }]
}, {
  orderId: '1235',
  orderPhase: OrderPhase.Ready,
  status: PizzaStatus.Available,
  requiredIngredients: [{
    name: IngredientName.flour,
    quantity: 4
  },
  {
    name: IngredientName.tomato,
    quantity: 2
  }]
}, {
  orderId: '1201',
  orderPhase: OrderPhase.Ready,
  status: PizzaStatus.Failed,
  requiredIngredients: [{
    name: IngredientName.flour,
    quantity: 4
  },
  {
    name: IngredientName.tomato,
    quantity: 2
  }]
}, {
  orderId: '1205',
  orderPhase: OrderPhase.Completed,
  status: PizzaStatus.Failed,
  requiredIngredients: [{
    name: IngredientName.flour,
    quantity: 4
  },
  {
    name: IngredientName.tomato,
    quantity: 2
  }]
}];

export const IngredientsMockData: Ingredient[] = [
  { name: IngredientName.flour, quantity: 10 },
  { name: IngredientName.tomato, quantity: 10 },
];


export const OrdersMockData: PizzaOrder[] = [...OrderMockData];