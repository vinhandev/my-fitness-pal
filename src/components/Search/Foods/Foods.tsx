import React from 'react';

import { ActivityIndicator, FlatList, Text, View } from 'react-native';

import { styles } from './Foods.styles';
import { FoodData } from '../../../types';
import Food from '../Food/Food';

type Props = {
  data: FoodData[];
  onAddFood: (food: FoodData) => void;
  loading: boolean;
};
export default function Foods({ data, onAddFood, loading }: Props) {
  if (loading) {
    return <ActivityIndicator />;
  }
  return (
    <FlatList
      ListEmptyComponent={
        <View style={styles.containerEmpty}>
          <Text>No food found</Text>
        </View>
      }
      contentContainerStyle={styles.list}
      data={data}
      renderItem={({ item }) => (
        <Food key={item.name} variant="add" food={item} onAddFood={() => onAddFood(item)} />
      )}
    />
  );
}
