import { FlatList, StyleSheet, Text, TextInput, View } from 'react-native';
import NumberInput from '../Inputs/NumberInput/NumberInput';
import StepVisualize from '../StepVisualize/StepVisualize';

export type InputItem<T> = {
  name: string;
  item: T;
  onChangeItem: (item: T) => void;
  errors?: {
    message: string;
    condition: (item: T) => boolean;
  }[];
};
type Props = {
  inputList: {
    label: string;
    data: InputItem<string | number>[];
  };
  maxStep: number;
  currentStepIndex: number;
};
export default function StepInputLayout({
  inputList,
  maxStep,
  currentStepIndex,
}: Props) {
  return (
    <View>
      <View
        style={{
          paddingVertical: 10,
        }}
      >
        <StepVisualize maxStep={maxStep} currentStepIndex={currentStepIndex} />
      </View>

      <View
        style={{
          paddingVertical: 10,
        }}
      >
        <Text
          style={{
            fontSize: 30,
            fontWeight: '700',
            color: '#000',
          }}
        >
          {inputList.label}
        </Text>
      </View>

      <FlatList
        contentContainerStyle={{ gap: 10, paddingVertical: 10 }}
        data={inputList.data}
        renderItem={({ item }) => {
          switch (typeof item.item) {
            case 'number':
              return (
                <NumberInput
                  style={styles.textInput}
                  placeholder={item.name}
                  numberValue={item.item}
                  onChangeNumber={item.onChangeItem}
                />
              );
            case 'string':
              return (
                <TextInput
                  style={styles.textInput}
                  placeholder={item.name}
                  value={item.item}
                  onChangeText={item.onChangeItem}
                />
              );
            default:
              break;
          }
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  textInput: {
    borderWidth: 1,
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 10,
    borderColor: '#ddd',
  },
  focus: {
    borderColor: '#000',
  },
});
