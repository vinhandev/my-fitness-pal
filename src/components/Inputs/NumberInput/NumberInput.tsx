import { LegacyRef, forwardRef } from 'react';
import { TextInputProps, TextInput as RNTextInput } from 'react-native';
import TextInput from '../TextInput/TextInput';

type Props = Omit<TextInputProps, 'onChangeText, keyboardType,value'> & {
  numberValue: number;
  onChangeNumber: (item: number) => void;
};
const NumberInput = forwardRef(
  (
    { numberValue, onChangeNumber, ...props }: Props,
    ref: LegacyRef<RNTextInput>
  ) => {
    const numberToText = numberValue === 0 ? '' : numberValue.toString();
    const handleChangeItem = (item: string) => {
      onChangeNumber(Number(item));
    };

    return (
      <TextInput
        ref={ref}
        keyboardType="decimal-pad"
        value={numberToText}
        onChangeText={handleChangeItem}
        {...props}
      />
    );
  }
);

export default NumberInput;
