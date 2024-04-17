import {
  ActivityIndicator,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {
  Ads,
  Foods,
  Header,
  Icon,
  NavigationBar,
  SearchBar,
  SearchTitle,
} from '../../components';

import { styles } from './Search.styles';

import { useEffect, useMemo, useState } from 'react';
import { FoodData, SelectorData } from '../../types';
import { useAddFoodApi, useSearchApi } from '../../hooks';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Colors, Sizes } from '../../assets';
import { Camera, CameraType } from 'expo-camera';
import { useDispatch, useSelector } from 'react-redux';
import { MealList, State, updateMeals } from '../../store/slices';

export default function Search() {
  const numberOfMeals = useSelector(
    (state: { user: State }) => state.user.numberOfMeals
  );
  const whenToEatData: SelectorData[] = Array.from(
    { length: numberOfMeals },
    (_, i) => ({
      label: `Meal ${i + 1}`,
      value: `${i}`,
    })
  );
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
  const [food, setFood] = useState('');
  const [value, setValue] = useState(whenToEatData[0].value);
  const [type, setType] = useState('All');
  const [isVerified, setIsVerified] = useState(false);
  const [selectedFoods, setSelectedFoods] = useState<FoodData[]>([]);
  const [scannerEnabled, setScannerEnabled] = useState(false);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const meals = useSelector((state: { user: State }) => state.user.mealsList);

  const dispatch = useDispatch();

  const { data, loading, error, search } = useSearchApi();

  const handleAddSelectedFood = async (food: FoodData) => {
    const param: MealList[] =
      meals?.map((item) => {
        if (item.mealName === whenToEatData[value].label) {
          return {
            ...item,
            meals: [
              ...item.meals,
              {
                name: food.name,
                calories: food.kcal,
                image: '',
              },
            ],
          };
        }
        return item;
      }) ?? [];
    dispatch(updateMeals(param));

    router.back();
  };

  const handleSearchValue = async () => {
    await search({
      variables: {
        ingr: food,
      },
    });
  };

  const handleScanBarcode = () => {
    setScannerEnabled(!scannerEnabled);
  };

  const filteredFoods = useMemo(() => {
    return data?.filter((food) => {
      if (isVerified) {
        return food.isVerified;
      }
      return food;
    });
  }, [food, data]);

  if (error) {
    return (
      <View style={styles.containerCenter}>
        <Text>{`Failed to search: ${error.message}`}</Text>
      </View>
    );
  }

  useEffect(() => {
    requestPermission();
  }, []);

  if (scannerEnabled) {
    return (
      <SafeAreaView style={styles.containerCamera}>
        <TouchableOpacity
          onPress={handleScanBarcode}
          style={{
            position: 'absolute',
            right: Sizes.paddingHorizontal,
            top: 10,
            bottom: 0,
            zIndex: 1,
          }}
        >
          <Icon variant="close" size={Sizes.bigIcon} color={Colors.white} />
        </TouchableOpacity>
        <Camera
          style={{
            flex: 1,
          }}
          // type={CameraType.front}
          onBarCodeScanned={({ data }) => {
            console.log('barcode', data);
          }}
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header
        variant="search"
        data={whenToEatData}
        value={value}
        onChange={setValue}
      />
      <View style={styles.containerSearch}>
        <View style={{ flexGrow: 1 }}>
          <SearchBar
            searchValue={food}
            onChangeSearchValue={setFood}
            onSearch={handleSearchValue}
          />
        </View>
      </View>
      <NavigationBar data={types} type={type} onChangeType={setType} />
      <SearchTitle isVerified={isVerified} onChangeIsVerified={setIsVerified} />
      <Foods
        data={filteredFoods}
        onAddFood={handleAddSelectedFood}
        loading={loading}
      />
      {/* <Ads /> */}
    </SafeAreaView>
  );
}
