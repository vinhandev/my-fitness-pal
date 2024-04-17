import { StyleSheet, Text, View } from 'react-native';
import { Background, Button } from '../../components';
import { router } from 'expo-router';
import TextButton from '../../components/Buttons/TextButton/TextButton';

export default function OnBoarding() {
  const handleNavigateRegisterPage = () => {
    router.replace('/register');
  };
  return (
    <View style={styles.container}>
      <View
        style={{
          height: '50%',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 30,
          paddingHorizontal: 35,
        }}
      >
        <View
          style={{
            gap: 10,
          }}
        >
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 35,
              color: '#fff',
              textAlign: 'center',
            }}
          >
            Hey, count your calories!
          </Text>
          <Text
            style={{
              fontWeight: '700',
              fontSize: 14,
              color: '#fff',
              textAlign: 'center',
            }}
          >
            Simple app help you eat better everyday. Believe in yourself and
            keep moving forward.
          </Text>
        </View>
        <TextButton icon="next" onPress={handleNavigateRegisterPage}>
          Get Started
        </TextButton>
      </View>
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: -1,
        }}
      >
        <Background />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
});
