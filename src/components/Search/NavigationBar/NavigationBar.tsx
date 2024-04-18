import React from 'react';

import { Text, TouchableOpacity, View } from 'react-native';

import { styles } from './NavigationBar.styles';
import { SelectorData } from '../../../types';

type Props = {
  data: SelectorData[];
  type: string;
  onChangeType: (value: string) => void;
};
export default function NavigationBar({ data, onChangeType, type }: Props) {
  return (
    <View style={styles.container}>
      {data?.map((item, index) => {
        return (
          <TouchableOpacity
            key={index}
            style={[styles.item, type === item.value && styles.itemActive]}
            onPress={() => onChangeType(item.value)}
          >
            <Text
              style={[styles.text, type === item.value && styles.textActive]}
            >
              {item.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
