import { LegacyRef, forwardRef, useEffect, useState } from 'react';
import {
  Button,
  Modal,
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
  View,
} from 'react-native';
import TextInput, { TextInputProps } from '../TextInput/TextInput';
import { getValueByVariableList } from '../../../utils';
type Props = Omit<TextInputProps, 'onChangeText, keyboardType,value'> & {
  gender: number;
  onChangeGender: (item: number) => void;
};
const GenderInput = forwardRef(
  (
    { gender, onChangeGender, ...props }: Props,
    ref: LegacyRef<RNTextInput>
  ) => {
    const [open, setOpen] = useState<boolean>(false);

    function handleOpen() {
      setOpen(!open);
    }

    const genderString = getValueByVariableList(gender, [
      {
        compareVariable: 0,
        returnVariable: 'Male',
      },
      {
        compareVariable: 1,
        returnVariable: 'Female',
      },
    ]);

    console.log('value', gender, genderString);

    return (
      <View>
        <TextInput
          ref={ref}
          value={genderString}
          onFocus={() => setOpen(true)}
          onPressIn={() => setOpen(true)}
          {...props}
        />
        <Modal visible={open} transparent>
          <View
            style={{
              flex: 1,
              justifyContent: 'flex-end',
              backgroundColor: '#00000055',
            }}
          >
            <View
              style={{
                backgroundColor: 'white',
                gap: 10,
              }}
            >
              <View
                style={{
                  paddingBottom: 50,
                }}
              >
                <Button
                  title="Male"
                  onPress={() => {
                    onChangeGender(0);
                    handleOpen();
                  }}
                />
                <Button
                  title="Female"
                  onPress={() => {
                    onChangeGender(1);
                    handleOpen();
                  }}
                />
              </View>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
);

export default GenderInput;
