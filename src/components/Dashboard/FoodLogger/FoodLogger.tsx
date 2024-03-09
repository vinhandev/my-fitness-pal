import React from 'react';

import { FlatList, Text, TouchableOpacity, View } from 'react-native';

import { styles } from './FoodLogger.styles';
import { MealData } from '../../../types';
import Food from '../../Search/Food/Food';

type Props = {
  meals: MealData[];
  onAddFood: () => void;
};

const Meal = ({ meal, onAdd }: { meal: MealData; onAdd: () => void }) => {
  const { foods, kcal, name } = meal;
  return (
    <View style={styles.item}>
      <View style={styles.btnTitle}>
        <Text style={styles.text1}>{name}</Text>
      </View>
      <FlatList
        data={foods}
        renderItem={({ item }) => <Food food={item} variant="log" />}
      />
      <View>
        <TouchableOpacity style={styles.btnAddFood} onPress={onAdd}>
          <Text style={styles.text2}>Add Food</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default function FoodLogger({ meals, onAddFood }: Props) {
  return (
    <FlatList
      contentContainerStyle={styles.list}
      data={meals}
      renderItem={({ item }) => (
        <Meal key={item.name} meal={item} onAdd={onAddFood} />
      )}
    />
  );
}
