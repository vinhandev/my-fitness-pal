import { StatusBar } from 'expo-status-bar';
import { Image, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const backgroundImage =
  'https://images.pexels.com/photos/1639556/pexels-photo-1639556.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2';

export default function Background() {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#000',
      }}
    >
      <StatusBar style="light" />
      <Image
        style={{
          flex: 1,
        }}
        source={{ uri: backgroundImage }}
      />
      <LinearGradient
        colors={['transparent', 'transparent', '#000']}
        style={{
          flex: 1,
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
      />
    </View>
  );
}
