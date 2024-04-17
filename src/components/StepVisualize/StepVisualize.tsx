import { View } from 'react-native';
import { Colors } from '../../assets';

type Props = {
  currentStepIndex: number;
  numberOfSteps: number;
};

export default function StepVisualize({ currentStepIndex, numberOfSteps }: Props) {
  return (
    <View
      style={{
        flexDirection: 'row',
        gap: 5,
      }}
    >
      {Array.from({ length: numberOfSteps }).map((item, index) => (
        <View
          key={index}
          style={{
            flex: 1,
            height: 5,
            borderRadius: 10,
            backgroundColor: index <= currentStepIndex ? Colors.primary : '#CCC',
          }}
        />
      ))}
    </View>
  );
}
