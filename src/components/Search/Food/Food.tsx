import React, { useMemo, useState } from 'react';

import { Text, TouchableOpacity, View } from 'react-native';

import { styles } from './Food.styles';
import { FoodData } from '../../../types';
import Icon from '../../Icon/Icon';
import { Colors, Sizes } from '../../../assets';
import SelectModal from '../../SelectModal/SelectModal';
import NumberInput from '../../Inputs/NumberInput/NumberInput';
import TextButton from '../../Buttons/TextButton/TextButton';

type Props = {
  food: FoodData;
} & (
  | {
      variant: 'add';
      onAddFood: (quantity: number) => void;
    }
  | {
      variant: 'log';
      onRemoveFood: () => void;
    }
);
export default function Food(props: Props) {
  const { food, variant } = props;

  const [open, setOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);

  switch (variant) {
    case 'add': {
      const { onAddFood } = props;
      const description = useMemo(() => {
        return `${food.kcal} kcal / 100g`;
        // return `${food.kcal} cal, ${food.quantity} ${food.unitType}, ${food.from}`;
      }, [food]);

      function handleSubmit() {
        onAddFood(quantity);
      }

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
            <TouchableOpacity style={styles.icon} onPress={() => setOpen(true)}>
              <Icon
                variant="plus"
                size={Sizes.bigIcon}
                color={Colors.primary}
              />
            </TouchableOpacity>
          </View>
          <SelectModal open={open} onOpen={setOpen} onSubmit={handleSubmit}>
            <View>
              <View
                style={{
                  marginHorizontal: 15,
                }}
              >
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: 'bold',
                  }}
                >
                  Food information
                </Text>
                <Text style={{ fontSize: 20, fontWeight: '300' }}>
                  {food.name} - {food.kcal * quantity} kcal - {quantity * 100} g
                </Text>
              </View>
              <View
                style={{
                  padding: 15,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <TextButton
                  icon="minus"
                  onPress={() => {
                    if (quantity > 0.5) {
                      setQuantity(quantity - 0.5);
                    }
                  }}
                />
                <Text
                  style={{
                    fontSize: 40,
                    fontWeight: 'bold',
                  }}
                >
                  {quantity * 100} g
                </Text>
                <TextButton
                  icon="plus"
                  onPress={() => setQuantity(quantity + 0.5)}
                />
              </View>
            </View>
          </SelectModal>
        </View>
      );
    }
    case 'log': {
      const description = useMemo(() => {
        return `${food.kcal} kcal`;
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
              <View>
                <TouchableOpacity
                  style={styles.icon}
                  onPress={props.onRemoveFood}
                >
                  <Icon
                    variant="minus"
                    size={Sizes.bigIcon}
                    color={Colors.primary}
                  />
                </TouchableOpacity>
              </View>
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
