import { StyleSheet } from 'react-native';
import { Colors, FontSizes, FontWeights, Sizes } from '../../../assets';

export const styles = StyleSheet.create({
  list: {
    backgroundColor: Colors.neutral,
    gap: 10,
  },
  item: {
    backgroundColor: Colors.white,
  },
  btnTitle: {
    padding: Sizes.paddingHorizontal,
    borderBottomWidth: 1,
    borderColor: Colors.neutral,
  },
  btnAddFood: {
    padding: Sizes.paddingHorizontal,
  },
  text1: {
    fontSize: FontSizes.big,
    fontWeight: FontWeights.bold,
  },
  text2: {
    fontSize: FontSizes.big,
    fontWeight: FontWeights.bold,
    color: Colors.primary,
    textTransform: 'uppercase',
  },
});
