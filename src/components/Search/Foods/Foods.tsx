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
      showsVerticalScrollIndicator={false}
      data={data}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item, index }) => {
        return (
          <Food
            key={index}
            variant="add"
            food={item}
            onAddFood={(quantity) =>
              onAddFood({
                ...item,
                kcal: quantity * item.kcal,
              })
            }
          />
        );
      }}
    />
  );
}
