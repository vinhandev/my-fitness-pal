import { LegacyRef, forwardRef } from 'react';
import { StyleSheet, View } from 'react-native';
import NumberInput from '../NumberInput/NumberInput';
import DateInput from '../DateInput/DateInput';
import GenderInput from '../GenderInput/GenderInput';
import TextInput from '../TextInput/TextInput';
import { Colors, Sizes } from '../../../assets';
import {
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
} from 'react-native';

const styles = StyleSheet.create({
  textInput: {
    borderWidth: 1,
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: Sizes.borderRadiusTextInput,
    borderColor: Colors.border,
  },
});

type Props = Omit<RNTextInputProps, 'value' | 'onChange' | 'defaultValue'> & {
  isError: boolean;
  errorMessage: string;
  name: string;
} & (
    | {
        type: 'string';
        value: string;
        onChangeItem: (item: string) => void;
        defaultValue?: string;
      }
    | {
        type: 'number' | 'date' | 'gender';
        value: number;
        onChangeItem: (item: number) => void;
        defaultValue?: number;
      }
  );

const FormByTypeItem = forwardRef<RNTextInput>((props: Props, ref) => {
  const { type, name, isError, errorMessage } = props;
  switch (type) {
    case 'number':
      return (
        <NumberInput
          {...props}
          ref={ref}
          style={styles.textInput}
          placeholder={name}
          numberValue={props.value}
          onChangeNumber={props.onChangeItem}
          isError={isError}
          errorMessage={errorMessage}
        />
      );
    case 'date':
      return (
        <DateInput
          {...props}
          ref={ref}
          style={styles.textInput}
          placeholder={name}
          dateTime={props.value}
          onChangeDate={props.onChangeItem}
          isError={isError}
          errorMessage={errorMessage}
        />
      );
    case 'gender':
      return (
        <GenderInput
          {...props}
          ref={ref}
          style={styles.textInput}
          placeholder={name}
          gender={props.value}
          onChangeGender={props.onChangeItem}
          isError={isError}
          errorMessage={errorMessage}
        />
      );
    case 'string':
      return (
        <TextInput
          {...props}
          ref={ref}
          style={styles.textInput}
          placeholder={name}
          value={props.value}
          onChangeText={props.onChangeItem}
          isError={isError}
          errorMessage={errorMessage}
        />
      );
    default:
      break;
  }
});

export const FormInput = forwardRef(
  (props: Props, ref: LegacyRef<RNTextInput>) => {
    return (
      <View>
        <FormByTypeItem ref={ref} {...props} />
      </View>
    );
  }
);
