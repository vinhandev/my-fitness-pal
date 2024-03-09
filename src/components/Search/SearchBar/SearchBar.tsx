import React from 'react';

import { Button, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { styles } from './SearchBar.styles';
import Icon from '../../Icon/Icon';
import { Colors, Sizes } from '../../../assets';

type Props = {
  searchValue: string;
  onChangeSearchValue: (value: string) => void;
  onSearch: () => void;
};
export default function SearchBar({
  searchValue,
  onChangeSearchValue,
  onSearch,
}: Props) {
  const handleClearData = () => {
    onChangeSearchValue('');
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerSearch}>
        <Icon variant="search" color={Colors.primary} size={Sizes.bigIcon} />
        <TextInput
          style={styles.input}
          value={searchValue}
          onChangeText={onChangeSearchValue}
          placeholder="Search..."
        />
        <TouchableOpacity onPress={handleClearData} style={styles.iconClose}>
          <Icon variant="close" size={Sizes.bigIcon} color={Colors.text2} />
        </TouchableOpacity>
      </View>
      {searchValue && <Button onPress={onSearch} title="Search" />}
    </View>
  );
}
