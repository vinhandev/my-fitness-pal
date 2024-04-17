import { LegacyRef, forwardRef, useEffect, useState } from 'react';
import {
  Button,
  Modal,
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
  View,
} from 'react-native';
import TextInput, { TextInputProps } from '../TextInput/TextInput';
import DateTimePicker from '@react-native-community/datetimepicker';
type Props = Omit<TextInputProps, 'onChangeText, keyboardType,value'> & {
  dateTime: number;
  onChangeDate: (item: number) => void;
};
const DateInput = forwardRef(
  (
    { dateTime, onChangeDate, ...props }: Props,
    ref: LegacyRef<RNTextInput>
  ) => {
    const [open, setOpen] = useState<boolean>(false);
    const [tempDate, setTempDate] = useState<Date>( new Date('2000-01-01T00:00:00.000Z'));

    const numberToDate = new Date(dateTime);
    const handleChangeItem = () => {
      onChangeDate(tempDate.getTime());
      handleOpen();
    };

    const handleChangeTempDate = (item: Date) => {
      setTempDate(item);
    };

    function handleOpen() {
      setOpen(!open);
    }

    useEffect(() => {
      if (dateTime > 0) {
        setTempDate(new Date(dateTime));
      }
    }, [dateTime]);

    return (
      <View>
        <TextInput
          ref={ref}
          value={
            dateTime === 0
              ? ''
              : `${numberToDate.getDate()}/${numberToDate.getMonth()}/${numberToDate.getFullYear()}`
          }
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
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: 10,
                  borderBottomWidth: 1,
                  borderColor: '#ddd',
                }}
              >
                <Button title="Cancel" onPress={handleOpen} />
                <Button title="Set" onPress={handleChangeItem} />
              </View>
              <View
                style={{
                  paddingBottom: 50,
                }}
              >
                <DateTimePicker
                  display="spinner"
                  mode="date"
                  value={tempDate}
                  is24Hour
                  onChange={(_, date) => handleChangeTempDate(date)}
                />
              </View>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
);

export default DateInput;
