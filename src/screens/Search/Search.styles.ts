import { StyleSheet } from 'react-native';
import { Colors, Sizes } from '../../assets';

export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.white, padding: 10 },
  containerCamera: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  containerCenter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerSearch: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Sizes.gap,

    paddingHorizontal: Sizes.paddingHorizontal,
  },
  containerScanner: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
