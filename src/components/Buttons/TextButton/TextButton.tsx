import { Text, View } from 'react-native';
import Button from '../Button/Button';
import Icon, { IconVariants } from '../../Icon/Icon';

type Props = {
  children: string;
  onPress: () => void;
  icon?: IconVariants;
  variant?: 'primary' | 'secondary';
};
export default function TextButton({
  children,
  icon,
  onPress,
  variant = 'primary',
}: Props) {
  let color;
  switch (variant) {
    case 'primary':
      color = '#fff';
      break;
    case 'secondary':
      color = '#000';
      break;
    default:
      break;
  }
  return (
    <Button variant={variant} onPress={onPress}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 10,
        }}
      >
        {icon ? <Icon color="#fff" size={20} variant={icon} /> : null}
        <Text
          style={{
            fontSize: 16,
            fontWeight: 'bold',
            color,
            textAlign: 'center',
          }}
        >
          {children}
        </Text>
      </View>
    </Button>
  );
}
