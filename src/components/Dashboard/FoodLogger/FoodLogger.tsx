import React from 'react';

import { FlatList, Text, TouchableOpacity, View } from 'react-native';

import { styles } from './FoodLogger.styles';
import { MealData } from '../../../types';
import Food from '../../Search/Food/Food';
import Icon from '../../Icon/Icon';
import { Colors, Sizes } from '../../../assets';
import ProgressBar from '../../ProgressBar/ProgressBar';
import { useSelector } from 'react-redux';
import { State } from '../../../store/slices';

type Props = {
  meals: MealData[];
  onAddFood: () => void;
};

const Meal = ({ meal, onAdd }: { meal: MealData; onAdd: () => void }) => {
  const { foods, kcal, name } = meal;
  return (
    <View style={styles.item}>
      <View
        style={{
          padding: Sizes.paddingHorizontal,
          borderBottomWidth: 1,
          borderColor: Colors.neutral,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <View style={styles.btnTitle}>
          <Text style={styles.text1}>{name}</Text>
          <TouchableOpacity style={styles.btnAddFood} onPress={onAdd}>
            <Icon variant="plus" size={15} color="#fff" />
          </TouchableOpacity>
        </View>
        <View>
          <Text
            style={{
              fontSize: 14,
              fontWeight: '500',
              color: '#aaa',
            }}
          >
            {kcal} kcal
          </Text>
        </View>
      </View>
      <FlatList
        data={foods}
        renderItem={({ item, index }) => (
          <Food key={index} food={item} variant="log" />
        )}
      />
    </View>
  );
};
export default function FoodLogger({ meals, onAddFood }: Props) {
  return (
    <FlatList
      contentContainerStyle={styles.list}
      data={meals}
      renderItem={({ item, index }) => (
        <Meal key={index} meal={item} onAdd={onAddFood} />
      )}
    />
  );
}
