import { Image, SafeAreaView, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { State, updateCalories } from '../../store/slices';
import { useEffect } from 'react';
import { router } from 'expo-router';
import TextButton from '../../components/Buttons/TextButton/TextButton';
import ProgressBar from '../../components/ProgressBar/ProgressBar';
import { LineChart } from 'react-native-gifted-charts';

export default function DashboardScreen() {
  const weight = useSelector((state: { user: State }) => state.user.weight);
  const weightList = useSelector(
    (state: { user: State }) => state.user.weightList
  );
  const mealsList = useSelector(
    (state: { user: State }) => state.user.mealsList
  );
  const caloriesList = useSelector(
    (state: { user: State }) => state.user.caloriesList
  );
  const goalWeight = useSelector(
    (state: { user: State }) => state.user.goalWeight
  );
  const height = useSelector((state: { user: State }) => state.user.height);
  const yearOfBirth = useSelector(
    (state: { user: State }) => state.user.yearOfBirth
  );
  const deadlineTime = useSelector(
    (state: { user: State }) => state.user.deadlineTime
  );
  const createAt = useSelector((state: { user: State }) => state.user.createAt);
  const gender = useSelector((state: { user: State }) => state.user.gender);
  const total = useSelector((state: { user: State }) => state.user.total);
  const current = useSelector((state: { user: State }) => state.user.current);
  const limit = useSelector((state: { user: State }) => state.user.limit);
  const createWeight = useSelector(
    (state: { user: State }) => state.user.createWeight
  );
  const name = useSelector((state: { user: State }) => state.user.name);
  const activitiesLevel = useSelector(
    (state: { user: State }) => state.user.activitiesLevel
  );
  const dispatch = useDispatch();

  const dayCount = Math.ceil((deadlineTime - createAt) / 1000 / 60 / 60 / 24);
  const dayStreak = Math.ceil(
    (new Date().getTime() - createAt) / 1000 / 60 / 60 / 24
  );
  const dayLeft = Math.ceil(
    deadlineTime - new Date().getTime() / 1000 / 60 / 60 / 24
  );

  const totalCalories = (createWeight - goalWeight) * 7700;

  const currentTotalCalories = totalCalories - (weight - goalWeight) * 7700;

  const age = new Date().getFullYear() - new Date(yearOfBirth).getFullYear();

  const handleNavigateToday = () => {
    router.push('/today');
  };

  const getBMI = () => {
    const BMI = weight / Math.pow(height / 100, 2);
  };

  const getBMR = () => {
    const BMR =
      gender === 0
        ? (88.362 + 13.397 * weight + 4.799 * height - 5.677 * age) *
          activitiesLevel
        : (447.593 + 9.247 * weight + 3.098 * height - 4.33 * age) *
          activitiesLevel;
    const total = BMR;
    const limit = BMR - ((weight - goalWeight) * 7700) / dayCount;
    console.log('BMR', BMR, height, age);

    const tempCurrent = mealsList.reduce(
      (a, b) => a + b.meals.reduce((c, d) => c + d.calories, 0),
      0
    );
    dispatch(updateCalories({ total, limit, current: tempCurrent }));
  };

  const handleNavigateUpdateWeight = () => {
    router.push('/updateWeight');
  };

  useEffect(() => {
    getBMR();
  }, [mealsList, activitiesLevel]);

  function isSameDay(date1: Date, date2: Date) {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  }

  console.log(current, limit, total, weight, goalWeight);

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <View
        style={{
          flex: 1,
          paddingHorizontal: 14,
          gap: 15,
          justifyContent: 'space-between',
        }}
      >
        <View>
          <Text
            style={{
              fontSize: 14,
              fontWeight: '300',
            }}
          >
            Hello,
          </Text>
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
            }}
          >
            {name}
          </Text>
        </View>
        <View
          style={{
            backgroundColor: '#6F6CB3',
            borderRadius: 20,
            padding: 20,
            height: 200,
            flexDirection: 'row',
            overflow: 'hidden',
          }}
        >
          <View style={{ flex: 1, justifyContent: 'space-between' }}>
            <Text style={{ fontWeight: '400', color: '#fff' }}>
              Day {dayStreak} / {dayCount}{' '}
            </Text>
            <Text style={{ fontWeight: 'bold', color: '#fff', fontSize: 22 }}>
              Not give up.{'\n'}You can do it !
            </Text>
            <View>
              <Text style={{ fontWeight: 'bold', color: '#fff', fontSize: 20 }}>
                <Text
                  style={{ fontWeight: 'bold', color: '#fff', fontSize: 30 }}
                >
                  {currentTotalCalories}
                </Text>
                <Text
                  style={{
                    fontWeight: '300',
                    fontSize: 20,
                  }}
                >
                  {' '}
                  /{' '}
                </Text>
                {Math.round(totalCalories)} kcal
              </Text>
              <ProgressBar
                current={currentTotalCalories}
                limit={totalCalories}
              />
            </View>
          </View>

          <View
            style={{
              position: 'absolute',
              top: -40,
              right: -40,
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,

              elevation: 5,
            }}
          >
            <Image
              style={{
                borderRadius: 1000,
                backgroundColor: '#fff',
                width: 200,
                height: 200,
              }}
              source={require('../../../assets/ico_dashboard.png')}
            />
          </View>
        </View>
        <View
          style={{
            borderRadius: 20,
            flexGrow: 1,
            justifyContent: 'center',
            alignItems: 'center',
            // paddingHorizontal: 15,
          }}
        >
          <LineChart
            // spacing={40}
            // hideDataPoints
            thickness={2}
            curved
            customDataPoint={({ value }) => <View />}
            // hideRules
            // hideYAxisText
            showVerticalLines={false}
            verticalLinesColor="rgba(14,164,164,0.5)"
            xAxisColor="transparent"
            yAxisColor="transparent"
            lineGradient
            lineGradientStartColor="#6F6CB3"
            lineGradientEndColor="#6F6"
            color="#6F6CB3"
            yAxisTextStyle={{
              fontSize: 12,
              color: '#000',
              fontWeight: 'bold',
            }}
            width={280}
            height={280}
            data={weightList.map((item) => ({
              value: item.value,
              dataPointText: `${item.dataPointText} - ${new Date(
                item.date
              ).getDate()} / ${new Date(item.date).getMonth() + 1}`,
            }))}
          />
        </View>
        <View style={{ gap: 10 }}>
          <TextButton onPress={handleNavigateToday}>Track today</TextButton>
          <TextButton variant="secondary" onPress={handleNavigateUpdateWeight}>
            Update weight
          </TextButton>
        </View>
      </View>
    </SafeAreaView>
  );
}
