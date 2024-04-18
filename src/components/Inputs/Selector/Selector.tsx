import React, { useMemo, useState } from 'react';

import { Button, Modal, Text, TouchableOpacity, View } from 'react-native';

import { styles } from './Selector.styles';
import { SelectorData } from '../../../types';
import Icon from '../../Icon/Icon';
import { Colors, Sizes } from '../../../assets';
import { SafeAreaView } from 'react-native-safe-area-context';
import SelectModal from '../../SelectModal/SelectModal';

type Props = {
  value: string;
  onChange: (value: string) => void;
  data: SelectorData[];
};
export default function Selector({ data, onChange, value }: Props) {
  const [open, setOpen] = useState(false);
  const handleOpenModal = () => {
    setOpen(!open);
  };

  const handleChange = (value: string) => {
    onChange(value);

    setOpen(false);
  };

  const displayValue = useMemo(() => {
    return data.find((item) => item.value === value)?.label;
  }, [data, value]);

  return (
    <View>
      <TouchableOpacity onPress={handleOpenModal}>
        <View style={styles.container}>
          <Text style={styles.text}>{displayValue}</Text>
          <Icon variant="down" size={Sizes.exSmall} color={Colors.primary} />
        </View>
      </TouchableOpacity>
      <SelectModal open={open} onOpen={setOpen} onSubmit={handleOpenModal}>
        <View style={styles.containerModal}>
          {data.map((item, index) => {
            return (
              <View
                key={index}
                style={{
                  backgroundColor: value === item.value ? '#ddd' : '#fff',
                  padding: 10,
                }}
              >
                <Button
                  key={item.label}
                  onPress={() => handleChange(item.value)}
                  title={item.label}
                />
              </View>
            );
          })}
        </View>
      </SelectModal>
    </View>
  );
}
