import React, { useMemo } from 'react';

import { Text, TouchableOpacity, View } from 'react-native';

import { styles } from './Food.styles';
import { FoodData } from '../../../types';
import Icon from '../../Icon/Icon';
import { Colors, Sizes } from '../../../assets';

type Props = {
  food: FoodData;
  onAddFood: () => void;
};
export default function Food({ food, onAddFood }: Props) {
  const description = useMemo(() => {
    return `${food.kcal} cal, ${food.quantity} ${food.unitType}, ${food.from}`;
  }, [food]);

  const isVerified = food.isVerified;

  return (
    <View style={styles.container}>
      <View>
        <View style={styles.title}>
          <Text style={styles.text1}>{food.name}</Text>
          {isVerified && (
            <Icon
              variant="verified"
              color={Colors.secondary}
              size={Sizes.smallIcon}
            />
          )}
        </View>
        <Text style={styles.text2}>{description}</Text>
      </View>
      <View>
        <TouchableOpacity style={styles.icon} onPress={onAddFood}>
          <Icon variant="plus" size={Sizes.bigIcon} color={Colors.primary} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
