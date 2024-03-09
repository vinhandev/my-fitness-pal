import React from 'react';

import { Text, TouchableOpacity, View } from 'react-native';

import { SelectorData } from '../../types';

import Icon from '../Icon/Icon';
import Selector from '../Inputs/Selector/Selector';

import { styles } from './Header.styles';
import { Sizes } from '../../assets';
import { router } from 'expo-router';

type Props =
  | {
      variant: 'search';
      value: string;
      onChange: (value: string) => void;
      data: SelectorData[];
    }
  | {
      variant: 'text';
      text: string;
    };
export default function Header(props: Props) {
  const { variant } = props;
  switch (variant) {
    case 'search': {
      const { data, onChange, value } = props;

      const handleGoBack = () => {
        if (router.canGoBack()) {
          router.back();
        }
      };

      return (
        <View style={styles.container}>
          <TouchableOpacity style={styles.selector} onPress={handleGoBack}>
            <Icon variant="back" color="#000" size={Sizes.bigIcon} />
          </TouchableOpacity>
          <View>
            <Selector data={data} onChange={onChange} value={value} />
          </View>
        </View>
      );
    }
    case 'text': {
      const { text } = props;

      return (
        <View style={styles.container}>
          <Text style={styles.text}>{text}</Text>
        </View>
      );
    }
    default:
      break;
  }
}
