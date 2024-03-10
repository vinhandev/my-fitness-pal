import React from 'react';

import { ActivityIndicator, Text, View } from 'react-native';

import { styles } from './Dashboard.styles';
import { Calories, DashboardAds, FoodLogger, Header } from '../../components';
import { MealData } from '../../types';
import { router } from 'expo-router';
import { useGetFoodByDateApi } from '../../hooks';

export default function Dashboard() {
  const { data, error, loading } = useGetFoodByDateApi(new Date(), 'vinhan');

  const goalKcal = 1000;
  const foodKcal = 500;

  if (loading) return <ActivityIndicator />;
  if (error) return <Text>{error.message}</Text>;

  const handleRedirectAddFood = () => {
    router.push('/search');
  };

  return (
    <View style={styles.container}>
      <Header variant="text" text="Dashboard" />
      <Calories goalKcal={goalKcal} foodKcal={foodKcal} />
      <DashboardAds />
      <FoodLogger meals={data} onAddFood={handleRedirectAddFood} />
    </View>
  );
}
