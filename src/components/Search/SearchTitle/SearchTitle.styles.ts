import { StyleSheet } from 'react-native';
import { Colors, FontSizes, FontWeights, Sizes } from '../../../assets';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    paddingHorizontal: Sizes.paddingHorizontal,
    paddingVertical: Sizes.paddingVertical,
  },
  buttonVerified: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Sizes.gap,

    padding: 10,

    borderWidth: 1,
    borderColor: Colors.neutral,
    borderRadius: Sizes.borderRadius,
  },
  text: {
    fontSize: FontSizes.big,
    fontWeight: FontWeights.bold,
  },
  textVerified: {
    fontSize: FontSizes.big,
    fontWeight: FontWeights.regular,
  },
});
