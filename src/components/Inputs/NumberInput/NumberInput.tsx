import { TextInput, TextInputProps } from 'react-native';

type Props = Omit<TextInputProps, 'onChangeText, keyboardType,value'> & {
  numberValue: number;
  onChangeNumber: (item: number) => void;
};
export default function NumberInput({
  numberValue,
  onChangeNumber,
  ...props
}: Props) {
  const numberToText = numberValue === 0 ? '' : numberValue.toString();
  const handleChangeItem = (item: string) => {
    onChangeNumber(Number(item));
  };

  return (
    <TextInput
      keyboardType="decimal-pad"
      value={numberToText}
      onChangeText={handleChangeItem}
      {...props}
    />
  );
}
