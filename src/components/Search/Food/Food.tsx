import React, { useMemo } from 'react';

import { Text, TouchableOpacity, View } from 'react-native';

import { styles } from './Food.styles';
import { FoodData } from '../../../types';
import Icon from '../../Icon/Icon';
import { Colors, Sizes } from '../../../assets';

type Props = {
  food: FoodData;
} & (
  | {
      variant: 'add';
      onAddFood: () => void;
    }
  | {
      variant: 'log';
    }
);
export default function Food(props: Props) {
  const { food, variant } = props;

  switch (variant) {
    case 'add': {
      const { onAddFood } = props;
      const description = useMemo(() => {
        return `${food.kcal} cal, ${food.quantity} ${food.unitType}, ${food.from}`;
      }, [food]);

      const isVerified = food.isVerified;

      return (
        <View style={styles.container}>
          <View style={styles.content}>
            <View style={styles.title}>
              <Text style={styles.text1}>
                {`${food.name} `}
                {isVerified && (
                  <Icon
                    variant="verified"
                    color={Colors.secondary}
                    size={Sizes.smallIcon}
                  />
                )}
              </Text>
            </View>
            <Text style={styles.text2}>{description}</Text>
          </View>
          <View>
            <TouchableOpacity style={styles.icon} onPress={onAddFood}>
              <Icon
                variant="plus"
                size={Sizes.bigIcon}
                color={Colors.primary}
              />
            </TouchableOpacity>
          </View>
        </View>
      );
    }
    case 'log': {
      const description = useMemo(() => {
        return `${food.kcal} cal, ${food.quantity} ${food.unitType}, ${food.from}`;
      }, [food]);

      const isVerified = food.isVerified;

      return (
        <View style={styles.containerLog}>
          <View style={styles.content}>
            <View style={styles.title}>
              <Text style={styles.text1}>
                {`${food.name} `}
                {isVerified && (
                  <Icon
                    variant="verified"
                    color={Colors.secondary}
                    size={Sizes.smallIcon}
                  />
                )}
              </Text>
            </View>
            <Text style={styles.text2}>{description}</Text>
          </View>
        </View>
      );
    }
    default:
      break;
  }
}
