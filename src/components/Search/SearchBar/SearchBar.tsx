import React from 'react';

import { Text, TextInput, TouchableOpacity, View } from 'react-native';

import { styles } from './SearchBar.styles';
import Icon from '../../Icon/Icon';
import { Colors, Sizes } from '../../../assets';

type Props = {
  searchValue: string;
  onChangeSearchValue: (value: string) => void;
};
export default function SearchBar({ searchValue, onChangeSearchValue }: Props) {
  const handleClearData = () => {
    onChangeSearchValue('');
  };

  const handleSearchValue = () => (e) =>
    onChangeSearchValue(e.nativeEvent.text);

  return (
    <View style={styles.container}>
      <View style={styles.containerSearch}>
        <Icon variant="search" color={Colors.primary} size={Sizes.bigIcon} />
        <TextInput
          style={styles.input}
          value={searchValue}
          onChange={handleSearchValue}
          placeholder='Search...'
        />
        <TouchableOpacity onPress={handleClearData} style={styles.iconClose}>
          <Icon variant="close" size={Sizes.bigIcon} color={Colors.text2} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
