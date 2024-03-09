import React from 'react';

import { Text, View } from 'react-native';

import { styles } from './Dashboard.styles';
import { Calories, DashboardAds, FoodLogger, Header } from '../../components';
import { MealData } from '../../types';
import { router } from 'expo-router';

export default function Dashboard() {
  const goalKcal = 1000;
  const foodKcal = 500;
  const meals: MealData[] = [
    {
      name: 'Breakfast',
      kcal: 100,
      foods: [
        {
          name: 'Eggs',
          kcal: 70,
          quantity: 2,
          unitType: 'eggs',
          from: 'eggs.com',
          isVerified: true,
        },
      ],
    },
    {
      name: 'Lunch',
      kcal: 100,
      foods: [
        {
          name: 'Eggs',
          kcal: 70,
          quantity: 2,
          unitType: 'eggs',
          from: 'eggs.com',
          isVerified: true,
        },
      ],
    },
  ];

  const handleRedirectAddFood = () => {
    router.push('/search');
  };

  return (
    <View style={styles.container}>
      <Header variant="text" text="Dashboard" />
      <Calories goalKcal={goalKcal} foodKcal={foodKcal} />
      <DashboardAds />
      <FoodLogger meals={meals} onAddFood={handleRedirectAddFood} />
    </View>
  );
}
