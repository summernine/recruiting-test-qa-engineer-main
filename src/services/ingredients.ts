import { Ingredient, IngredientName } from "../types";

const ingredientsStockDefault = [
  { name: IngredientName.flour, quantity: 100 },
  { name: IngredientName.tomato, quantity: 100 },
  { name: IngredientName.mozzarella, quantity: 100 },
  { name: IngredientName.pepperoni, quantity: 100 },
  { name: IngredientName.mushrooms, quantity: 100 },
];
export class IngredientsService {
  private stock: Ingredient[];
  constructor(
    igredientsStock: {
      name: IngredientName;
      quantity: number;
    }[] = ingredientsStockDefault
  ) {
    this.stock = igredientsStock;
  }

  getStock() {
    return this.stock;
  }

  updateStock(ingredientName: IngredientName, quantity: number) {
    const ingredient = this.stock.find((i) => i.name === ingredientName);
    if (ingredient) {
      ingredient.quantity -= quantity;
    }
  }

  updateStockAll(ingredients: Ingredient[]) {
    ingredients.forEach((i) => this.updateStock(i.name, i.quantity));
  }

  isAvailable(ingredientName: IngredientName, quantity: number) {
    const ingredient = this.stock.find((i) => i.name === ingredientName);
    if (ingredient && quantity !== null) {
      return ingredient.quantity >= quantity;
    }
    return false;
  }

  isAvailableAll(ingredients: Ingredient[]) {
    return ingredients.every((i) => this.isAvailable(i.name, i.quantity));
  }
}
