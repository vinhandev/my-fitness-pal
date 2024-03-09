import { ActivityIndicator, Text, View } from 'react-native';

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
import { useSearchApi } from '../../hooks';
import { SafeAreaView } from 'react-native-safe-area-context';

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
  const whenToEatData: SelectorData[] = [
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
  const [food, setFood] = useState('Pizza');
  const [value, setValue] = useState(whenToEatData[0].value);
  const [type, setType] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const [selectedFoods, setSelectedFoods] = useState<FoodData[]>([]);

  const { data, loading, error, search } = useSearchApi();

  const handleAddSelectedFood = (food: FoodData) => {
    setSelectedFoods([...selectedFoods, food]);
  };

  const handleSearchValue = async () => {
    await search({
      variables: {
        ingr: food,
      },
    });
  };

  const filteredFoods = useMemo(() => {
    return data?.filter((food) => {
      if (isVerified) {
        return food.isVerified;
      }
      return food;
    });
  }, [foodData, food]);

  if (loading) {
    return (
      <View style={styles.containerCenter}>
        <ActivityIndicator />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.containerCenter}>
        <Text>{`Failed to search: ${error.message}`}</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Header
          variant="search"
          data={whenToEatData}
          value={value}
          onChange={setValue}
        />
        <SearchBar
          searchValue={food}
          onChangeSearchValue={setFood}
          onSearch={handleSearchValue}
        />
        <NavigationBar data={types} type={type} onChangeType={setType} />
        <SearchTitle
          isVerified={isVerified}
          onChangeIsVerified={setIsVerified}
        />
        <Foods data={filteredFoods} onAddFood={handleAddSelectedFood} />
        <Ads />
      </View>
    </SafeAreaView>
  );
}
