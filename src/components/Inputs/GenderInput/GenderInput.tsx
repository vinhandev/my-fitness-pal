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
import SelectModal from '../../SelectModal/SelectModal';

export const GenderList = {
  MALE: 0,
  FEMALE: 1,
};

type Props = Omit<
  TextInputProps,
  'onChangeText' | ' keyboardType' | 'value' | 'defaultValue'
> & {
  gender: number;
  onChangeGender: (item: number) => void;
  defaultValue?: number;
};
const GenderInput = forwardRef(
  (
    { gender, onChangeGender, defaultValue = 0, ...props }: Props,
    ref: LegacyRef<RNTextInput>
  ) => {
    const [open, setOpen] = useState<boolean>(false);
    const [tempGender, setTempGender] = useState<number>(defaultValue);

    const genderString = getValueByVariableList(gender, [
      {
        compareVariable: GenderList.MALE,
        returnVariable: 'Male',
      },
      {
        compareVariable: GenderList.FEMALE,
        returnVariable: 'Female',
      },
    ]);

    console.log('value', gender, genderString);

    const handleSubmit = () => {
      onChangeGender(tempGender);
      setOpen(false);
    };

    const handleChangeGender = (paramGender: number) => {
      setTempGender(paramGender);
    };

    return (
      <View>
        <TextInput
          {...props}
          ref={ref}
          value={genderString}
          onFocus={() => setOpen(true)}
          onPressIn={() => setOpen(true)}
        />
        <SelectModal open={open} onOpen={setOpen} onSubmit={handleSubmit}>
          <View>
            <View
              style={{
                backgroundColor: tempGender === 0 ? '#ddd' : '#fff',
              }}
            >
              <Button
                title="Male"
                onPress={() => handleChangeGender(GenderList.MALE)}
              />
            </View>
            <View
              style={{
                backgroundColor: tempGender === 1 ? '#ddd' : '#fff',
              }}
            >
              <Button
                title="Female"
                onPress={() => handleChangeGender(GenderList.FEMALE)}
              />
            </View>
          </View>
        </SelectModal>
      </View>
    );
  }
);

export default GenderInput;
