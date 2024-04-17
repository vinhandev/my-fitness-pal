import { createSlice } from '@reduxjs/toolkit';

export type MealData = {
  calories: number;
  image: string;
  name: string;
};
export type MealList = {
  mealName: string;
  meals: MealData[];
};
export type State = {
  name: string;
  weight: number;
  height: number;
  yearOfBirth: number;
  deadlineTime: number;
  mealsList: MealList[];
  numberOfMeals: number;
  goalWeight: number;
  createWeight: number;
  total: number;
  limit: number;
  gender: number;
  current: number;
  createAt: number;
  activitiesLevel: number;
  weightList: {
    value: number;
    dataPointText: string;
    date: number;
  }[];
  caloriesList: {
    calories: number;
    date: number;
  }[];
};

const initialState: State = {
  name: '',
  weight: 0,
  height: 0,
  gender: 0,
  yearOfBirth: 0,
  deadlineTime: 0,
  mealsList: [],
  numberOfMeals: 0,
  goalWeight: 0,
  createWeight: 0,
  activitiesLevel: 1,
  total: 0,
  limit: 0,
  current: 0,
  createAt: 0,
  weightList: [],
  caloriesList: [],
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    registerInformation(
      state,
      action: { payload: Omit<State, 'weightList, caloriesList'> }
    ) {
      state.name = action.payload.name;
      state.weight = action.payload.weight;
      state.goalWeight = action.payload.goalWeight;
      state.height = action.payload.height;
      state.yearOfBirth = action.payload.yearOfBirth;
      state.deadlineTime = action.payload.deadlineTime;
      state.numberOfMeals = action.payload.numberOfMeals;
      state.mealsList = action.payload.mealsList;
      state.createAt = new Date().getTime();
      state.createWeight = action.payload.createWeight;
    },
    updateMeals(state, action: { payload: MealList[] }) {
      state.mealsList = action.payload;
    },
    updateWeight(state, action: { payload: number }) {
      state.weight = action.payload;
    },
    updateActivitiesLevel(state, action: { payload: number }) {
      state.activitiesLevel = action.payload;
    },
    updateCalories(
      state,
      action: {
        payload: {
          total: number;
          limit: number;
          current: number;
        };
      }
    ) {
      state.current = action.payload.current;
      state.total = action.payload.total;
      state.limit = action.payload.limit;
    },
    addWeightList(
      state,
      action: {
        payload: { value: number; date: number; dataPointText: string };
      }
    ) {
      state.weightList.push(action.payload);
    },
    addCaloriesList(
      state,
      action: { payload: { calories: number; date: number } }
    ) {
      state.caloriesList.push(action.payload);

      state.mealsList = state.mealsList.map((meal) => {
        return {
          meals: [],
          mealName: meal.mealName,
        };
      });
    },
  },
});

export const {
  registerInformation,
  updateMeals,
  updateWeight,
  updateCalories,
  addCaloriesList,
  addWeightList,
  updateActivitiesLevel,
} = userSlice.actions;
export const user = userSlice.reducer;
