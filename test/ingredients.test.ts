import { IngredientsService } from "../src/services/ingredients";
import { Ingredient, IngredientName } from "../src/types";
import { IngredientsMockData } from "../src/mock/orders.mock";

describe('Ingredients', () => {
  let ingredientsService: IngredientsService;

  beforeEach(() => {
    ingredientsService = new IngredientsService();
  });

  const ingredientsStockDefault = [
    { name: IngredientName.flour, quantity: 100 },
    { name: IngredientName.tomato, quantity: 100 },
    { name: IngredientName.mozzarella, quantity: 100 },
    { name: IngredientName.pepperoni, quantity: 100 },
    { name: IngredientName.mushrooms, quantity: 100 },
  ];

  describe('List ingredients', () => {
    it('should get ingredients stock', async () => {
      const stocks = ingredientsService.getStock();

      expect(stocks).toEqual(ingredientsStockDefault);
    });
  });

  describe('Update ingredients', () => {
    let defaultQuantity: any,
      defaultQuantity2: any;

    it('should update ingredients quantity', async () => {
      const ingredient = IngredientName.flour;
      const quantity = 20;
      defaultQuantity = ingredientsStockDefault.find(i => i.name == ingredient)?.quantity;

      ingredientsService.updateStock(ingredient,quantity);
      const updatedStocks = ingredientsService.getStock();
      
      const newQuantity = defaultQuantity - quantity;

      expect(updatedStocks.find(i => i.name == ingredient)?.quantity).toBe(newQuantity);
    });

    it('should update multiple ingredients quantity', async () => {
      const defaultStocks = ingredientsService.getStock();
      defaultQuantity = defaultStocks.find(i => i.name == IngredientsMockData[0].name)?.quantity;
      defaultQuantity2 = defaultStocks.find(i => i.name == IngredientsMockData[1].name)?.quantity;

      ingredientsService.updateStockAll(IngredientsMockData);
      const updatedStocks = ingredientsService.getStock();

      const newQuantity = defaultQuantity - IngredientsMockData[0].quantity;
      const newQuantity2 = defaultQuantity2 - IngredientsMockData[1].quantity;

      expect(updatedStocks.find(i => i.name == IngredientsMockData[0].name)?.quantity).toBe(newQuantity);
      expect(updatedStocks.find(i => i.name == IngredientsMockData[1].name)?.quantity).toBe(newQuantity2);
    });
  });

  describe('Available ingredients', () => {
    it('should check if ingredient is available', () => {
      const isIngredientAvailable = ingredientsService.isAvailable(IngredientName.mushrooms, 100);

      expect(isIngredientAvailable).toBe(true);
    });

    it('should check if ingredient is not available', () => {
      const isIngredientAvailable = ingredientsService.isAvailable(IngredientName.mushrooms, 200);
      
      expect(isIngredientAvailable).toBe(false);
    });

    it('should check if ingredient quantity is null', () => {
      const isIngredientAvailable = ingredientsService.isAvailable(IngredientName.mushrooms, null as any);

      expect(isIngredientAvailable).toBe(false);
    });

    it('should check if ingredient quantity is empty', () => {
      const isIngredientAvailable = ingredientsService.isAvailable(IngredientName.mushrooms, {} as any);

      expect(isIngredientAvailable).toBe(false);
    });

    it('should check if ingredient quantity is undefined', () => {
      const isIngredientAvailable = ingredientsService.isAvailable(IngredientName.mushrooms, undefined as any);

      expect(isIngredientAvailable).toBe(false);
    });

    it('should check if ingredient name is null', () => {
      const isIngredientAvailable = ingredientsService.isAvailable(null as any, 200);

      expect(isIngredientAvailable).toBe(false);
    });

    it('should check if ingredient name is undefined', () => {
      const isIngredientAvailable = ingredientsService.isAvailable(undefined as any, 200);

      expect(isIngredientAvailable).toBe(false);
    });

    it('should check if ingredient name is empty', () => {
      const isIngredientAvailable = ingredientsService.isAvailable({} as any, 200);

      expect(isIngredientAvailable).toBe(false);
    });
  });

  describe('Check multiple ingredients', () => {
    it('should check if ingredients are available', () => {
      const ingredients: Ingredient[] = [
        { name: IngredientName.flour, quantity: 10 },
        { name: IngredientName.tomato, quantity: 10 },
      ];

      const isIngredientAvailable = ingredientsService.isAvailableAll(ingredients);

      expect(isIngredientAvailable).toBe(true);
    });

    it('should check if one ingredient is null', () => {
      const ingredients: Ingredient[] = [
        { name: null as any, quantity: 10 },
        { name: IngredientName.tomato, quantity: 10 },
      ];

      const isIngredientAvailable = ingredientsService.isAvailableAll(ingredients);

      expect(isIngredientAvailable).toBe(false);
    });

    it('should check if one ingredient is empty', () => {
      const ingredients: Ingredient[] = [
        { name: {} as any, quantity: 10 },
        { name: IngredientName.tomato, quantity: 10 },
      ];

      const isIngredientAvailable = ingredientsService.isAvailableAll(ingredients);

      expect(isIngredientAvailable).toBe(false);
    });

    it('should check if one ingredient is undefined', () => {
      const ingredients: Ingredient[] = [
        { name: undefined as any, quantity: 10 },
        { name: IngredientName.tomato, quantity: 10 },
      ];

      const isIngredientAvailable = ingredientsService.isAvailableAll(ingredients);

      expect(isIngredientAvailable).toBe(false);
    });

    it('should check if one quantity is undefined', () => {
      const ingredients: Ingredient[] = [
        { name: IngredientName.flour, quantity: undefined as any },
        { name: IngredientName.tomato, quantity: 10 },
      ];

      const isIngredientAvailable = ingredientsService.isAvailableAll(ingredients);
      
      expect(isIngredientAvailable).toBe(false);
    });

    it('should check if one quantity is null', () => {
      const ingredients: Ingredient[] = [
        { name: IngredientName.flour, quantity: null as any },
        { name: IngredientName.tomato, quantity: 10 },
      ];

      const isIngredientAvailable = ingredientsService.isAvailableAll(ingredients);
      
      expect(isIngredientAvailable).toBe(false);
    });

    it('should check if one quantity is empty', () => {
      const ingredients: Ingredient[] = [
        { name: IngredientName.flour, quantity: {} as any },
        { name: IngredientName.tomato, quantity: 10 },
      ];

      const isIngredientAvailable = ingredientsService.isAvailableAll(ingredients);
      
      expect(isIngredientAvailable).toBe(false);
    });
  });

});