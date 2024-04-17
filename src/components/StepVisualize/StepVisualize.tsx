import { View } from 'react-native';
import { Colors } from '../../constants';

type Props = {
  currentStepIndex: number;
  maxStep: number;
};

export default function StepVisualize({ currentStepIndex, maxStep }: Props) {
  return (
    <View
      style={{
        flexDirection: 'row',
        gap: 5,
      }}
    >
      {Array.from({ length: maxStep }).map((item, index) => (
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
