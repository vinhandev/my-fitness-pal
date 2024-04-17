import {
  View,
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
  NativeSyntheticEvent,
  TextInputFocusEventData,
} from 'react-native';
import ErrorText from '../../ErrorText/ErrorText';
import { LegacyRef, forwardRef, useState } from 'react';
import { Colors } from '../../../assets';
import { getValueByConditionList } from '../../../utils';

export type TextInputProps = RNTextInputProps & {
  isError?: boolean;
  errorMessage?: string;
  focusColor?: string;
};
const TextInput = forwardRef(
  (
    {
      isError = false,
      errorMessage,
      focusColor = Colors.borderWhenFocus,
      style,
      onFocus,
      onBlur,
      ...props
    }: TextInputProps,
    ref: LegacyRef<RNTextInput>
  ) => {
    const [isFocused, setIsFocused] = useState(false);

    const borderColor = getValueByConditionList(
      [
        {
          condition: isError,
          returnValue: Colors.borderWhenError,
        },
        {
          condition: isFocused,
          returnValue: Colors.borderWhenFocus,
        },
      ],
      Colors.border
    );

    function handleOnFocus(e: NativeSyntheticEvent<TextInputFocusEventData>) {
      setIsFocused(true);
      onFocus && onFocus(e);
    }
    function handleOnBlur(e: NativeSyntheticEvent<TextInputFocusEventData>) {
      setIsFocused(false);
      onBlur && onBlur(e);
    }

    return (
      <View style={{ gap: 10 }}>
        <RNTextInput
          ref={ref}
          onFocus={handleOnFocus}
          onBlur={handleOnBlur}
          style={[
            style,
            {
              borderColor,
            },
          ]}
          {...props}
        />
        <ErrorText isError={isError} error={errorMessage} />
      </View>
    );
  }
);

export default TextInput;
