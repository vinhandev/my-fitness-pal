import { StyleSheet } from 'react-native';
import { Colors, FontSizes, FontWeights, Sizes } from '../../../assets';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',

    paddingHorizontal: Sizes.paddingHorizontal,
    paddingVertical: Sizes.paddingHorizontal,
  },
  containerCalories: {
    backgroundColor: Colors.white,

    paddingHorizontal: Sizes.paddingHorizontal,
  },
  item: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  text1: {
    fontSize: FontSizes.small,
    fontWeight: FontWeights.regular,
  },
  text2: {
    fontSize: FontSizes.small,
    fontWeight: FontWeights.light,
  },
});
