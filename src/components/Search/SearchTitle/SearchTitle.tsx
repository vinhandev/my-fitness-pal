import React from 'react';

import { Text, TouchableOpacity, View } from 'react-native';

import { styles } from './SearchTitle.styles';
import Icon from '../../Icon/Icon';
import { Colors, Sizes } from '../../../assets';

type Props = {
  isVerified: boolean;
  onChangeIsVerified: (value: boolean) => void;
};
export default function SearchTitle({ isVerified, onChangeIsVerified }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Search Results</Text>
      <TouchableOpacity onPress={() => onChangeIsVerified(!isVerified)}>
        <View style={styles.buttonVerified}>
          <Icon
            variant="verified"
            color={isVerified ? Colors.secondary : Colors.text2}
            size={Sizes.bigIcon}
          />
          <Text style={styles.textVerified}>Only</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}
