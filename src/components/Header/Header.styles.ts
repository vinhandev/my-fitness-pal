import { StyleSheet } from 'react-native';
import { Sizes } from '../../assets';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    paddingHorizontal: Sizes.paddingHorizontal,
    paddingVertical: Sizes.paddingVertical,
  },
  selector: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,

    justifyContent: 'center',
    alignItems: 'center',
  },
});
