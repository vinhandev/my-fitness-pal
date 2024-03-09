import { StyleSheet } from 'react-native';
import { Colors, FontSizes, FontWeights, Sizes } from '../../../assets';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Sizes.gap,
  },
  containerModal: {
    flex: 1,

    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: Colors.primary,
    fontSize: FontSizes.big,
    fontWeight: FontWeights.bold,
  },
});
