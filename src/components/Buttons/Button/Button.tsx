import { ReactNode } from 'react';
import { Button as RNButton, Text, TouchableOpacity } from 'react-native';
import Icon from '../../Icon/Icon';
import { Colors } from '../../../constants';

export type ButtonType = 'primary' | 'secondary';
type Props = {
  children: ReactNode;
  onPress: () => void;
  variant: ButtonType;
};
export default function Button({ children, onPress, variant }: Props) {
  let backgroundColor;
  switch (variant) {
    case 'primary':
      backgroundColor = Colors.primary;
      break;
    case 'secondary':
      backgroundColor = '#dddddd';
      break;

    default:
      break;
  }

  return (
    <TouchableOpacity
      style={{
        backgroundColor,

        alignItems: 'center',
        gap: 10,

        paddingHorizontal: 20,
        paddingVertical: 15,
        borderRadius: 10,
      }}
      onPress={onPress}
    >
      {children}
    </TouchableOpacity>
  );
}
