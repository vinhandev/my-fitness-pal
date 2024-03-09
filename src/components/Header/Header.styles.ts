import { StyleSheet } from 'react-native';
import { Colors, FontSizes, FontWeights, Sizes } from '../../assets';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',

    paddingHorizontal: Sizes.paddingHorizontal,
    paddingVertical: Sizes.paddingVertical,
  },
  selector: {
    position: 'absolute',
    left: Sizes.paddingHorizontal,
    top: 0,
    bottom: 0,

    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: FontSizes.big,
    fontWeight: FontWeights.bold,
    color: Colors.black,
  },
});
