import { LegacyRef, forwardRef, useEffect } from 'react';
import {
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
} from 'react-native';
import TextInput, { TextInputProps } from '../TextInput/TextInput';

type Props = Omit<
  TextInputProps,
  'onChangeText' | 'keyboardType' | 'value' | 'defaultValue'
> & {
  numberValue: number;
  onChangeNumber: (item: number) => void;
  defaultValue?: number;
};
const NumberInput = forwardRef(
  (
    { numberValue, onChangeNumber, defaultValue = 0, ...props }: Props,
    ref: LegacyRef<RNTextInput>
  ) => {
    const numberToText = numberValue === 0 ? '' : numberValue.toString();
    const handleChangeItem = (item: string) => {
      if (item === '') {
        onChangeNumber(0);
        return;
      }
      if (Number(item)) {
        onChangeNumber(Number(item));
      }
    };

    useEffect(() => {
      if (defaultValue !== undefined) {
        onChangeNumber(defaultValue);
      }
    }, [defaultValue]);

    return (
      <TextInput
        {...props}
        ref={ref}
        keyboardType="decimal-pad"
        value={numberToText}
        onChangeText={handleChangeItem}
      />
    );
  }
);

export default NumberInput;
