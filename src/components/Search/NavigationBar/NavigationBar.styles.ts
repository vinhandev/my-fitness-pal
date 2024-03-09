import { StyleSheet } from 'react-native';
import { Colors, FontSizes, FontWeights, Sizes } from '../../../assets';

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Sizes.paddingHorizontal,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  item: {
    padding: 10,
  },
  itemActive: {
    borderBottomWidth: 2,
    borderColor: Colors.primary,
  },
  text: {
    fontSize: FontSizes.small,
    fontWeight: FontWeights.regular,
  },
  textActive: {
    fontWeight: FontWeights.bold,
  },
});
