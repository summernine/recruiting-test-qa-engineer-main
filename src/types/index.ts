export enum OrderPhase {
  Ready = "Ready",
  Cooking = "Cooking",
  Completed = "Completed",
}

export enum PizzaStatus {
  Available = "Available",
  Pending = "Pending",
  Prepared = "Prepared",
  Failed = "failed",
}

export enum IngredientName {
  flour = "flour",
  tomato = "tomato",
  mozzarella = "mozzarella",
  pepperoni = "pepperoni",
  mushrooms = "mushrooms",
}

export interface Ingredient {
  name: IngredientName;
  quantity: number;
}

export interface PizzaOrder {
  orderId: string;
  orderPhase: OrderPhase;
  status: PizzaStatus;
  requiredIngredients: Ingredient[];
}
