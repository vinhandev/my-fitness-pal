import { Text, View } from 'react-native';

import {
  Ads,
  Foods,
  Header,
  NavigationBar,
  SearchBar,
  SearchTitle,
} from '../../components';

import { styles } from './Search.styles';

import { useMemo, useState } from 'react';
import { FoodData, SelectorData } from '../../types';

export default function Search() {
  const foodData: FoodData[] = [
    {
      name: 'Pizza',
      kcal: 300,
      quantity: 1,
      unitType: 'slice',
      from: 'Pizza Pizaa',
      isVerified: true,
    },
    {
      name: 'Hamburger',
      kcal: 300,
      quantity: 1,
      unitType: 'slice',
      from: 'Hamburger Pizaa',
      isVerified: false,
    },
    {
      name: 'Hamburger',
      kcal: 300,
      quantity: 1,
      unitType: 'slice',
      from: 'Hamburger Pizaa',
      isVerified: false,
    },
    {
      name: 'Hamburger',
      kcal: 300,
      quantity: 1,
      unitType: 'slice',
      from: 'Hamburger Pizaa',
      isVerified: false,
    },
    {
      name: 'Hamburger',
      kcal: 300,
      quantity: 1,
      unitType: 'slice',
      from: 'Hamburger Pizaa',
      isVerified: false,
    },
    {
      name: 'Hamburger',
      kcal: 300,
      quantity: 1,
      unitType: 'slice',
      from: 'Hamburger Pizaa',
      isVerified: false,
    },
    {
      name: 'Hamburger',
      kcal: 300,
      quantity: 1,
      unitType: 'slice',
      from: 'Hamburger Pizaa',
      isVerified: false,
    },
    {
      name: 'Hamburger',
      kcal: 300,
      quantity: 1,
      unitType: 'slice',
      from: 'Hamburger Pizaa',
      isVerified: false,
    },
    {
      name: 'Hamburger',
      kcal: 300,
      quantity: 1,
      unitType: 'slice',
      from: 'Hamburger Pizaa',
      isVerified: false,
    },
    {
      name: 'Hamburger',
      kcal: 300,
      quantity: 1,
      unitType: 'slice',
      from: 'Hamburger Pizaa',
      isVerified: false,
    },
    {
      name: 'Hamburger',
      kcal: 300,
      quantity: 1,
      unitType: 'slice',
      from: 'Hamburger Pizaa',
      isVerified: false,
    },
    {
      name: 'Hamburger',
      kcal: 300,
      quantity: 1,
      unitType: 'slice',
      from: 'Hamburger Pizaa',
      isVerified: false,
    },
    {
      name: 'Hamburger',
      kcal: 300,
      quantity: 1,
      unitType: 'slice',
      from: 'Hamburger Pizaa',
      isVerified: false,
    },
  ];
  const data: SelectorData[] = [
    {
      label: 'Breakfast',
      value: 'Breakfast',
    },
    {
      label: 'Lunch',
      value: 'Lunch',
    },
  ];
  const types: SelectorData[] = [
    {
      label: 'All',
      value: 'All',
    },
    {
      label: 'My Meals',
      value: 'My Meals',
    },
    {
      label: 'My Recipes',
      value: 'My Recipes',
    },
    {
      label: 'My Foods',
      value: 'My Foods',
    },
  ];
  const [searchValue, setSearchValue] = useState('Pizza');
  const [value, setValue] = useState(data[0].value);
  const [type, setType] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const [selectedFoods, setSelectedFoods] = useState<FoodData[]>([]);

  const handleAddSelectedFood = (food: FoodData) => {
    setSelectedFoods([...selectedFoods, food]);
  };

  const handleSearchValue = () => {};

  const filteredFoods = useMemo(() => {
    return foodData.filter((food) => {
      if (isVerified) {
        return food.isVerified;
      }
      return food;
    });
  }, [foodData, searchValue]);

  return (
    <View style={styles.container}>
      <Header variant="search" data={data} value={value} onChange={setValue} />
      <SearchBar
        searchValue={searchValue}
        onChangeSearchValue={setSearchValue}
        onSearch={handleSearchValue}
      />
      <NavigationBar data={types} type={type} onChangeType={setType} />
      <SearchTitle isVerified={isVerified} onChangeIsVerified={setIsVerified} />
      <Foods data={filteredFoods} onAddFood={handleAddSelectedFood} />
      <Ads />
    </View>
  );
}
