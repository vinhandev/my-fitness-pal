export type FoodData = {
  name: string;
  kcal: number;
  quantity: number;
  unitType: string;
  from: string;
  isVerified: boolean;
};

export type MealData = {
  name: string;
  kcal: number;
  foods: FoodData[];
};
