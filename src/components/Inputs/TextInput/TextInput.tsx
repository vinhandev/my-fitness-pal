import { View, TextInput as RNTextInput, TextInputProps } from 'react-native';
import ErrorText from '../../ErrorText/ErrorText';
import { LegacyRef, forwardRef } from 'react';

type Props = TextInputProps & {
  invalid?: boolean;
  error?: string;
};
const TextInput = forwardRef(
  (
    { invalid = false, error, ...props }: Props,
    ref: LegacyRef<RNTextInput>
  ) => {
    return (
      <View style={{ gap: 10 }}>
        <RNTextInput ref={ref} {...props} />
        <ErrorText invalid={invalid} error={error} />
      </View>
    );
  }
);

export default TextInput;
