import {
  FlatList,
  StyleSheet,
  Text,
  TextInput as RNTextInput,
  View,
} from 'react-native';
import NumberInput from '../Inputs/NumberInput/NumberInput';
import StepVisualize from '../StepVisualize/StepVisualize';
import TextButton from '../Buttons/TextButton/TextButton';
import TextInput from '../Inputs/TextInput/TextInput';
import { useEffect, useRef } from 'react';
import { handleStepButtonState } from '../../utils';

export type InputItem<T> = {
  name: string;
  item: T;
  errors?: {
    message: string;
    condition: (item: T) => boolean;
  }[];
  onChangeItem: (item: T) => void;
};
type Props = {
  inputList: {
    label: string;
    data: InputItem<string | number>[];
  };
  numberOfSteps: number;
  currentStepIndex: number;
  onSubmit: () => void;
  onBack: () => void;
  onNext: () => void;
};
export default function StepInputLayout({
  inputList,
  numberOfSteps,
  currentStepIndex,
  onBack,
  onNext,
  onSubmit,
}: Props) {
  const firstInputRef = useRef<any>();
  const { isCanBack, isCanSubmit } = handleStepButtonState(
    currentStepIndex,
    numberOfSteps
  );

  useEffect(() => {
    if (firstInputRef.current) {
      firstInputRef.current.focus();
    }
  }, [currentStepIndex]);

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          paddingVertical: 10,
        }}
      >
        <StepVisualize
          numberOfSteps={numberOfSteps}
          currentStepIndex={currentStepIndex}
        />
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
        renderItem={({ item, index }) => {
          const isFirstInput = index === 0;

          console.log('step', isFirstInput, item);

          switch (typeof item.item) {
            case 'number':
              return (
                <NumberInput
                  ref={isFirstInput ? firstInputRef : undefined}
                  style={styles.textInput}
                  placeholder={item.name}
                  numberValue={item.item}
                  onChangeNumber={item.onChangeItem}
                />
              );
            case 'string':
              return (
                <TextInput
                  ref={isFirstInput ? firstInputRef : undefined}
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

      <View style={{ gap: 10, paddingVertical: 10 }}>
        {isCanBack ? (
          <TextButton variant="secondary" onPress={onBack}>
            Back
          </TextButton>
        ) : null}
        {isCanSubmit ? (
          <TextButton onPress={onSubmit}>Submit</TextButton>
        ) : (
          <TextButton onPress={onNext}>Next</TextButton>
        )}
      </View>
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
