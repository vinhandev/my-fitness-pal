import { View, TextInput as RNTextInput, TextInputProps } from 'react-native';
import ErrorText from '../../ErrorText/ErrorText';

type Props = TextInputProps & {
  invalid?: boolean;
  error?: string;
};
export default function TextInput({ invalid = false, error, ...props }: Props) {
  return (
    <View style={{ gap: 10 }}>
      <RNTextInput {...props} />
      <ErrorText invalid={invalid} error={error} />
    </View>
  );
}
