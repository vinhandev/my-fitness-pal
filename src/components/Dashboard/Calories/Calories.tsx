import React from 'react';

import { Text, View } from 'react-native';

import { styles } from './Calories.styles';

type Props = {
  goalKcal: number;
  foodKcal: number;
};

const Item = ({ title, value }: { title: string; value: number }) => (
  <View style={styles.item}>
    <Text style={styles.text1}>{value}</Text>
    <Text style={styles.text2}>{title}</Text>
  </View>
);
export default function Calories({ goalKcal, foodKcal }: Props) {
  const remainingKcal = goalKcal - foodKcal;

  return (
    <View style={styles.containerCalories}>
      <Text style={styles.text1}>Calories Remaining</Text>
      <View style={styles.container}>
        <Item title="Goal" value={goalKcal} />
        <Text style={styles.text1}>-</Text>
        <Item title="Food" value={foodKcal} />
        <Text style={styles.text1}>=</Text>
        <Item title="Remaining" value={remainingKcal} />
      </View>
    </View>
  );
}
