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
  disabled?: boolean;
  meals: MealData[];
  onAddFood: () => void;
  onRemoveFood: (mealIndex: number, foodIndex: number) => void;
};

const Meal = ({
  meal,
  index: mealIndex,
  onAdd,
  onRemove,
  disabled = false,
}: {
  meal: MealData;
  onAdd: () => void;
  onRemove: (mealIndex: number, foodIndex: number) => void;
  index: number;
  disabled?: boolean;
}) => {
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
          {!disabled && (
            <TouchableOpacity style={styles.btnAddFood} onPress={onAdd}>
              <Icon variant="plus" size={15} color="#fff" />
            </TouchableOpacity>
          )}
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
          <Food
            disabled={disabled}
            key={index}
            food={item}
            variant="log"
            onRemoveFood={() => onRemove(mealIndex, index)}
          />
        )}
      />
    </View>
  );
};
export default function FoodLogger({
  meals,
  onAddFood,
  onRemoveFood,
  disabled,
}: Props) {
  return (
    <FlatList
      contentContainerStyle={styles.list}
      data={meals}
      renderItem={({ item, index }) => (
        <Meal
          disabled={disabled}
          key={index}
          index={index}
          meal={item}
          onAdd={onAddFood}
          onRemove={onRemoveFood}
        />
      )}
    />
  );
}
