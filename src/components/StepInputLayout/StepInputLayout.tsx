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
import TextInput, { TextInputProps } from '../Inputs/TextInput/TextInput';
import {
  ForwardedRef,
  LegacyRef,
  MutableRefObject,
  ReactNode,
  forwardRef,
  useEffect,
  useRef,
  useState,
} from 'react';
import { getValueByConditionList, handleStepButtonState } from '../../utils';
import { Colors, Sizes } from '../../assets';
import DateInput from '../Inputs/DateInput/DateInput';
import GenderInput from '../Inputs/GenderInput/GenderInput';
import { FormInput } from '../Inputs/FormInput/FormInput';

export type ErrorInputItem<T> = {
  message: string;
  onValidate: (item: T) => boolean;
};
export type InputItem = {
  name: string;
} & (
  | {
      type: 'string';
      value: string;
      onChangeItem: (item: string) => void;
      errors?: ErrorInputItem<string>[];
      defaultValues?: string;
    }
  | {
      type: 'number' | 'date' | 'gender';
      value: number;
      onChangeItem: (item: number) => void;
      errors?: ErrorInputItem<number>[];
      defaultValues?: number;
    }
);

export type InputListProps = {
  label: string;
  data: InputItem[];
};
type Props = {
  inputList: InputListProps;
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
  const firstInputRef = useRef<RNTextInput>();
  const [isFirstAttempt, setIsFirstAttempt] = useState(true);
  const [errorList, setErrorList] = useState<
    {
      isError: boolean;
      errorMessage: string;
    }[]
  >([]);

  const { isCanBack, isCanSubmit } = handleStepButtonState(
    currentStepIndex,
    numberOfSteps
  );

  function handleBeforeNext() {
    setIsFirstAttempt(false);
    if (!handleCheckError()) {
      onNext();
    }
  }

  function handleBeforeSubmit() {
    setIsFirstAttempt(false);
    if (!handleCheckError()) {
      onSubmit();
    }
  }

  function handleBeforeBack() {
    onBack();
  }

  function handleCheckErrorInOneFormInput(input: InputItem) {
    const errors = input.errors;
    if (!errors || !errors.length) {
      return {
        isError: false,
        errorMessage: '',
      };
    }
    for (let index = 0; index < errors.length; index++) {
      const message = input.errors[index].message;
      const isError = input.errors[index].onValidate(input.value as never);
      if (isError) {
        return {
          isError: true,
          errorMessage: message,
        };
      }
    }
    return {
      isError: false,
      errorMessage: '',
    };
  }

  function handleCheckError(): boolean {
    const tempErrorBooleanList = Array.from(
      { length: inputList.data.length },
      () => ({
        isError: false,
        errorMessage: '',
      })
    );
    for (let index = 0; index < inputList.data.length; index++) {
      const element = inputList.data[index];
      const checkedResponse = handleCheckErrorInOneFormInput(element);
      tempErrorBooleanList[index] = checkedResponse;
    }
    setErrorList(tempErrorBooleanList);

    if (tempErrorBooleanList.some((item) => item.isError)) {
      return true;
    }

    return false;
  }

  useEffect(() => {
    if (firstInputRef.current) {
      firstInputRef.current.focus();
    }
    handleCheckError();
    setIsFirstAttempt(true);
  }, [currentStepIndex]);

  useEffect(() => {
    handleCheckError();
  }, [inputList]);

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
          const { name } = item;
          const error = errorList[index];
          return (
            <FormInput
              ref={index === 0 ? firstInputRef : null}
              name={name}
              isError={!isFirstAttempt && error?.isError}
              errorMessage={error?.errorMessage ?? ''}
              {...item}
            />
          );
        }}
      />

      <View style={{ gap: 10, paddingVertical: 10 }}>
        {isCanBack ? (
          <TextButton variant="secondary" onPress={handleBeforeBack}>
            Back
          </TextButton>
        ) : null}
        {isCanSubmit ? (
          <TextButton onPress={handleBeforeSubmit}>Submit</TextButton>
        ) : (
          <TextButton onPress={handleBeforeNext}>Next</TextButton>
        )}
      </View>
    </View>
  );
}
