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
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  btnAddFood: {
    borderRadius: 1000,
    backgroundColor: Colors.primary,
    height: 20,
    width: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text1: {
    fontSize: 20,
    fontWeight: FontWeights.bold,
  },
  text2: {
    fontSize: FontSizes.small,
    fontWeight: '400',
    color: Colors.primary,
    textTransform: 'uppercase',
  },
});
