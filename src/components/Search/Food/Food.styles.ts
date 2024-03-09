import { StyleSheet } from 'react-native';
import { Colors, FontSizes, FontWeights, Sizes } from '../../../assets';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    marginHorizontal: Sizes.paddingHorizontal,
    paddingHorizontal: Sizes.paddingVertical,
    paddingVertical: Sizes.paddingVertical,

    borderRadius: 5,
    backgroundColor: Colors.neutral,
  },
  containerLog: {
    paddingHorizontal: Sizes.paddingHorizontal,
    paddingVertical: Sizes.paddingVertical,

    backgroundColor: Colors.white,
  },
  content: {
    flex: 1,
  },
  text1: {
    fontSize: FontSizes.small,
    fontWeight: FontWeights.regular,
  },
  text2: {
    fontSize: FontSizes.small,
    fontWeight: FontWeights.regular,
    color: Colors.text2,
  },
  title: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Sizes.gap,
  },
  icon: {
    borderRadius: 1000,
    padding: 10,
    backgroundColor: Colors.neutral2,
  },
});
