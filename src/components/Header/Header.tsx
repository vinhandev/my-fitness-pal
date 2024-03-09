import React from 'react';

import { Text, View } from 'react-native';

import { SelectorData } from '../../types';

import Icon from '../Icon/Icon';
import Selector from '../Inputs/Selector/Selector';

import { styles } from './Header.styles';
import { Sizes } from '../../assets';

type Props = {
  variant: 'search';
  value: string;
  onChange: (value: string) => void;
  data: SelectorData[];
};
export default function Header(props: Props) {
  const { variant } = props;
  switch (variant) {
    case 'search': {
      const { data, onChange, value } = props;
      return (
        <View style={styles.container}>
          <Icon variant="back" color="#000" size={Sizes.bigIcon} />
          <View style={styles.selector}>
            <Selector data={data} onChange={onChange} value={value} />
          </View>
        </View>
      );
    }
    default:
      break;
  }
}
