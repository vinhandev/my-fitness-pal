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

export type ErrorInputItem<T> = {
  message: string;
  onValidate: (item: T) => boolean;
};
export type InputItem = {
  name: string;
  type: 'number' | 'string' | 'date' | 'gender';
} & (
  | {
      type: 'string';
      value: string;
      onChangeItem: (item: string) => void;
      errors?: ErrorInputItem<string>[];
    }
  | {
      type: 'number' | 'date' | 'gender';
      value: number;
      onChangeItem: (item: number) => void;
      errors?: ErrorInputItem<number>[];
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

function handleValidate<T>(
  value: T,
  errors: ErrorInputItem<T>[]
): string | null {
  if (errors?.length === 0) return null;
  const validatedErrorList = errors?.filter((item) => item.onValidate(value));
  return !!validatedErrorList && validatedErrorList?.length > 0
    ? validatedErrorList[0].message
    : null;
}

type StepInputItemProps = {
  ref?: MutableRefObject<RNTextInput | null>;
  item: InputItem;
  index: number;
  hideError?: boolean;
  onError: (param: boolean) => void;
};

const StepInputItem = forwardRef(
  (
    { item, index, hideError = false, onError }: StepInputItemProps,
    ref: ForwardedRef<RNTextInput>
  ) => {
    const { name, value, onChangeItem, errors, type } = item;

    const isFirstInput = index === 0;
    const errorMessage = handleValidate(value, errors);

    const isError = errorMessage !== null;

    console.log(errorMessage, isError);

    useEffect(() => {
      console.log(item.type, !!errors ? isError : false);
      onError(!!errors ? isError : false);
    }, [isError]);

    switch (type) {
      case 'number':
        return (
          <NumberInput
            ref={isFirstInput ? ref : undefined}
            style={styles.textInput}
            placeholder={name}
            numberValue={value}
            onChangeNumber={(item) => onChangeItem(item as typeof value)}
            isError={!hideError && isError}
            errorMessage={errorMessage}
          />
        );
      case 'date':
        return (
          <DateInput
            ref={isFirstInput ? ref : undefined}
            style={styles.textInput}
            placeholder={name}
            dateTime={value}
            onChangeDate={(item) => onChangeItem(item as typeof value)}
            isError={!hideError && isError}
            errorMessage={errorMessage}
          />
        );
      case 'gender':
        return (
          <GenderInput
            ref={isFirstInput ? ref : undefined}
            style={styles.textInput}
            placeholder={name}
            gender={value}
            onChangeGender={(item) => onChangeItem(item)}
            isError={!hideError && isError}
            errorMessage={errorMessage}
          />
        );
      case 'string':
        return (
          <TextInput
            ref={isFirstInput ? ref : undefined}
            style={styles.textInput}
            placeholder={name}
            value={value}
            onChangeText={(item) => onChangeItem(item as typeof value)}
            isError={!hideError && isError}
            errorMessage={errorMessage}
          />
        );
      default:
        break;
    }
  }
);

export default function StepInputLayout({
  inputList,
  numberOfSteps,
  currentStepIndex,
  onBack,
  onNext,
  onSubmit,
}: Props) {
  const [isFirstTimeClickButton, setIsFirstTimeClickButton] =
    useState<boolean>(true);
  const [errorCountBooleanList, setErrorCountBooleanList] = useState<boolean[]>(
    []
  );
  const firstInputRef = useRef<RNTextInput>();
  const { isCanBack, isCanSubmit } = handleStepButtonState(
    currentStepIndex,
    numberOfSteps
  );

  const isErrorInAStep =
    errorCountBooleanList.filter((item) => !item).length <
    inputList.data.length;

  console.log(errorCountBooleanList, isErrorInAStep);

  function handleBeforeNext() {
    console.log(isFirstTimeClickButton, isErrorInAStep, errorCountBooleanList);
    if (isFirstTimeClickButton) {
      setIsFirstTimeClickButton(false);
    }
    if (isErrorInAStep) return;
    onNext();
  }

  function handleBeforeSubmit() {
    if (isFirstTimeClickButton) {
      setIsFirstTimeClickButton(false);
    }
    if (isErrorInAStep) return;
    onSubmit();
  }

  function handleBeforeBack() {
    onBack();
  }

  useEffect(() => {
    if (firstInputRef.current) {
      firstInputRef.current.focus();
    }
    setErrorCountBooleanList(
      Array.from({ length: inputList.data.length }, () => false)
    );
    setIsFirstTimeClickButton(true);
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

      {errorCountBooleanList.length > 0 && (
        <FlatList
          contentContainerStyle={{ gap: 10, paddingVertical: 10 }}
          data={inputList.data}
          renderItem={({ item, index }) => (
            <StepInputItem
              ref={index === 0 ? firstInputRef : undefined}
              item={item}
              index={index}
              hideError={isFirstTimeClickButton}
              onError={(param) => {
                console.log('ok ??');

                const tempBooleanList = errorCountBooleanList.map(
                  (booleanErrorItem, booleanErrorIndex) => {
                    console.log(
                      booleanErrorIndex,
                      index,
                      item,
                      tempBooleanList,
                      param
                    );
                    if (index === booleanErrorIndex) {
                      return param;
                    }
                    return booleanErrorItem;
                  }
                );
                console.log(
                  'tempData',
                  tempBooleanList,
                  tempBooleanList.length,
                  index,
                  errorCountBooleanList.length
                );
                setErrorCountBooleanList(() => tempBooleanList);
              }}
            />
          )}
        />
      )}

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

const styles = StyleSheet.create({
  textInput: {
    borderWidth: 1,
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: Sizes.borderRadiusTextInput,
    borderColor: Colors.border,
  },
});
