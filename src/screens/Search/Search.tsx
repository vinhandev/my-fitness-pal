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

export default function Search() {
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
  const [food, setFood] = useState('');
  const [value, setValue] = useState(whenToEatData[0].value);
  const [type, setType] = useState('All');
  const [isVerified, setIsVerified] = useState(false);
  const [selectedFoods, setSelectedFoods] = useState<FoodData[]>([]);
  const [scannerEnabled, setScannerEnabled] = useState(false);
  const [permission, requestPermission] = Camera.useCameraPermissions();

  const { data, loading, error, search } = useSearchApi();
  const [addFood] = useAddFoodApi();

  const handleAddSelectedFood = async (food: FoodData) => {
    await addFood({
      variables: {
        user_id: 'vinhan',
        food_id: food.id,
        kcal: food.kcal,
        label: food.name,
      },
    });
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
      <View style={styles.containerCamera}>
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
      </View>
    );
  }

  return (
    <View style={styles.container}>
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
        <TouchableOpacity onPress={handleScanBarcode}>
          <Icon variant="scanner" size={Sizes.bigIcon} color={Colors.black} />
        </TouchableOpacity>
      </View>
      <NavigationBar data={types} type={type} onChangeType={setType} />
      <SearchTitle isVerified={isVerified} onChangeIsVerified={setIsVerified} />
      <Foods
        data={filteredFoods}
        onAddFood={handleAddSelectedFood}
        loading={loading}
      />
      <Ads />
    </View>
  );
}
