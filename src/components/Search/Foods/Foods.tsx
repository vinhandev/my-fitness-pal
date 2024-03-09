import React from 'react';

import { FlatList, Text, View } from 'react-native';

import { styles } from './Foods.styles';
import { FoodData } from '../../../types';
import Food from '../Food/Food';

type Props = {
  data: FoodData[];
  onAddFood: (food: FoodData) => void;
};
export default function Foods({ data, onAddFood }: Props) {
  return (
    <View style={styles.container}>
      <FlatList
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        data={data}
        renderItem={({ item }) => (
          <Food food={item} onAddFood={() => onAddFood(item)} />
        )}
      />
    </View>
  );
}
