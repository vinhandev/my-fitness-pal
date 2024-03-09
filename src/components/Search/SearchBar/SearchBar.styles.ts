import { StyleSheet } from 'react-native';
import { Colors, FontSizes, FontWeights, Sizes } from '../../../assets';

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Sizes.paddingHorizontal,
    paddingVertical: Sizes.paddingVertical,
  },
  containerSearch: {
    position: 'relative',

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: Sizes.gap,

    padding: Sizes.paddingHorizontal,

    borderRadius: Sizes.borderRadius,

    backgroundColor: Colors.neutral,
  },
  iconClose: {
    width: Sizes.clickableSize,
    height: undefined,
    aspectRatio: 1,

    position: 'absolute',
    top: 0,
    right:
      Sizes.paddingHorizontal - Sizes.clickableSize / 2 + Sizes.bigIcon / 2,
    bottom: 0,

    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    flexGrow: 1,
    flex: 1,

    fontSize: FontSizes.small,
    fontWeight: FontWeights.regular,
  },
});
