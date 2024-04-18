import React from 'react';

import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { styles } from './Today.styles';
import {
  Button,
  Calories,
  DashboardAds,
  FoodLogger,
  Header,
  Icon,
} from '../../components';
import { MealData } from '../../types';
import { router } from 'expo-router';
import { useGetFoodByDateApi } from '../../hooks';
import { useDispatch, useSelector } from 'react-redux';
import {
  State,
  addCaloriesList,
  updateActivitiesLevel,
  updateMeals,
} from '../../store/slices';
import { SafeAreaView } from 'react-native-safe-area-context';
import ProgressBar from '../../components/ProgressBar/ProgressBar';
import TextButton from '../../components/Buttons/TextButton/TextButton';

export default function Dashboard() {
  const dispatch = useDispatch();
  const activitiesLevel = useSelector(
    (state: { user: State }) => state.user.activitiesLevel
  );
  const meals = useSelector((state: { user: State }) => state.user.mealsList);
  const data: MealData[] =
    meals?.map((item) => ({
      name: item?.mealName,
      kcal: item?.meals?.reduce((a, b) => a + b.calories, 0),
      foods: item?.meals?.map((subItem, index) => ({
        id: index + '',
        name: subItem.name,
        kcal: subItem.calories,
        quantity: 1,
        unitType: 'part',
        from: '',
        isVerified: false,
      })),
    })) ?? [];

  const current = useSelector((state: { user: State }) => state.user.current);
  const limit = useSelector((state: { user: State }) => state.user.limit);
  const caloriesList = useSelector(
    (state: { user: State }) => state.user.caloriesList
  );

  const handleRedirectAddFood = () => {
    router.push('/search');
  };

  const handleRemoveFood = (mealIndex: number, foodIndex: number) => {
    const tmpMeals = meals.map((item, index) => {
      if (index === mealIndex) {
        return {
          ...item,
          meals: item.meals.filter((_, index) => index !== foodIndex),
        };
      }
      return item;
    });

    console.log(mealIndex, foodIndex, tmpMeals);

    dispatch(updateMeals(tmpMeals));
  };

  const isSameDay = (date1: Date, date2: Date) => {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  };

  const disabled =
    caloriesList &&
    caloriesList?.length > 0 &&
    isSameDay(
      new Date(),
      new Date(caloriesList?.[caloriesList?.length - 1]?.date)
    );

  console.log(current, limit);

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          paddingHorizontal: 15,
        }}
      >
        <TouchableOpacity
          style={{
            borderRadius: 10,
            backgroundColor: '#EDECF4',
            height: 50,
            width: 50,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => {
            router.back();
          }}
        >
          <Icon variant="back" color="#554E91" size={25} />
        </TouchableOpacity>
      </View>
      <View
        style={{
          paddingHorizontal: 15,
          paddingVertical: 20,
          gap: 10,
        }}
      >
        <Text
          style={{
            fontSize: 16,
            fontWeight: '500',
          }}
        >
          Today
        </Text>
        <Text
          style={{
            fontSize: 25,
            fontWeight: '700',
          }}
        >
          {new Date().toLocaleDateString()}
        </Text>
      </View>
      <View
        style={{
          paddingHorizontal: 15,
        }}
      >
        <Text
          style={{
            fontSize: 14,
            fontWeight: 'bold',
          }}
        >
          Select your activity levels for today
        </Text>
        <View
          style={{
            width: Dimensions.get('window').width - 30,
            flexDirection: 'row',
            gap: 10,
            paddingVertical: 10,
          }}
        >
          {[
            {
              label: 'Not active',
              value: 1,
            },
            {
              label: 'Lightly active',
              value: 1.25,
            },
            {
              label: 'Active',
              value: 1.5,
            },
            {
              label: 'Very active ',
              value: 1.75,
            },
          ].map((item, index) => (
            <View
              key={index}
              style={{
                flex: 1,
              }}
            >
              <Button
                variant={
                  activitiesLevel === item.value ? 'primary' : 'secondary'
                }
                onPress={() => dispatch(updateActivitiesLevel(item.value))}
              >
                <View
                  style={{
                    width: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: 40,
                    // backgroundColor: 'red',
                  }}
                >
                  <Text
                    style={{
                      fontSize: 14,
                      color: '#fff',
                      fontWeight: 'bold',
                      textAlign: 'center',
                    }}
                  >
                    {item.label}
                  </Text>
                </View>
              </Button>
            </View>
          ))}
        </View>
      </View>
      <FoodLogger
        meals={data}
        onAddFood={handleRedirectAddFood}
        onRemoveFood={handleRemoveFood}
      />

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 15,
          gap: 10,
        }}
      >
        <View style={{ flex: 1 }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingVertical: 10,
            }}
          >
            <Text
              style={{
                fontSize: 15,
                fontWeight: '700',
                color: 'grey',
              }}
            >
              Progress
            </Text>
            <Text>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: '700',
                }}
              >
                {Math.round(limit - current)}
              </Text>{' '}
              kcal
            </Text>
          </View>
          <ProgressBar current={current} limit={limit} />
        </View>

        <TouchableOpacity
          disabled={disabled}
          style={{
            borderRadius: 10,
            backgroundColor: disabled ? 'grey' : '#554E91',
            height: 50,
            paddingHorizontal: 20,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => {
            dispatch(
              addCaloriesList({
                calories: current,
                date: new Date().getTime(),
              })
            );
            router.back();
          }}
        >
          <Text
            style={{
              color: '#fff',
              fontWeight: '700',
            }}
          >
            Submit
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
