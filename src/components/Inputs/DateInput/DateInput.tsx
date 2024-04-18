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
import SelectModal from '../../SelectModal/SelectModal';
type Props = Omit<
  TextInputProps,
  'onChangeText' | 'keyboardType' | 'value' | 'defaultValue'
> & {
  dateTime: number;
  onChangeDate: (item: number) => void;
  defaultValue?: number;
};
const DateInput = forwardRef(
  (
    { dateTime, onChangeDate, defaultValue = 0, ...props }: Props,
    ref: LegacyRef<RNTextInput>
  ) => {
    const initDate =
      defaultValue === 0 ? '2000-01-01T00:00:00.000Z' : defaultValue;

    const [open, setOpen] = useState<boolean>(false);
    const [tempDate, setTempDate] = useState<Date>(new Date(initDate));

    const numberToDate = new Date(dateTime);
    const handleConfirm = () => {
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
          {...props}
          ref={ref}
          value={
            dateTime === 0
              ? ''
              : `${numberToDate.getDate()}/${
                  numberToDate.getMonth() + 1
                }/${numberToDate.getFullYear()}`
          }
          onFocus={() => setOpen(true)}
          onPressIn={() => setOpen(true)}
        />
        <SelectModal open={open} onOpen={setOpen} onSubmit={handleConfirm}>
          <DateTimePicker
            display="spinner"
            mode="date"
            value={tempDate}
            is24Hour
            onChange={(_, date) => handleChangeTempDate(date)}
          />
        </SelectModal>
      </View>
    );
  }
);

export default DateInput;
