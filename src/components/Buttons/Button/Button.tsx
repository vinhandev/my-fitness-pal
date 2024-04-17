import { ReactNode } from 'react';
import { Button as RNButton, Text, TouchableOpacity } from 'react-native';
import { Colors } from '../../../assets';

export type ButtonType = 'primary' | 'secondary';
type Props = {
  children: ReactNode;
  onPress: () => void;
  variant?: ButtonType;
};
export default function Button({
  children,
  onPress,
  variant = 'primary',
}: Props) {
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
      activeOpacity={0.9}
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
