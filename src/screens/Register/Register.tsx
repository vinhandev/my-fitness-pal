import {
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { State, registerInformation } from '../../store/slices';
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import StepInputLayout, {
  InputItem,
} from '../../components/StepInputLayout/StepInputLayout';
import TextButton from '../../components/Buttons/TextButton/TextButton';
import { router } from 'expo-router';

const maxStep = 3;

type FormData = {
  name: string;
  yearOfBirth: number;
  weight: number;
  height: number;
  numberOfMealInDay: number;
  deadlineTime: number;
  goalWeight: number;
};
export default function RegisterScreen() {
  const [stepIndex, setStepIndex] = useState<number>(0);
  const [data, setData] = useState<FormData>({
    name: '',
    yearOfBirth: 0,
    height: 0,
    weight: 0,
    goalWeight: 0,
    deadlineTime: new Date('2024-06-01').getTime(),
    numberOfMealInDay: 0,
  });
  const dispatch = useDispatch();

  let isShowSubmitButton;
  let isShowBackButton;
  switch (stepIndex) {
    case 0:
      isShowBackButton = false;
      isShowSubmitButton = false;
      break;
    case maxStep - 1:
      isShowBackButton = true;
      isShowSubmitButton = true;

      break;
    default:
      isShowBackButton = true;
      isShowSubmitButton = false;
      break;
  }

  const handleInitInformation = () => {
    const param: State = {
      name: data.name,
      deadlineTime: data.deadlineTime,
      height: data.height,
      weight: data.weight,
      yearOfBirth: data.yearOfBirth,
      numberOfMeals: data.numberOfMealInDay,
      goalWeight: data.goalWeight,
      createAt: new Date().getTime(),
      createWeight: data.weight,
      mealsList:
        Array.from({ length: data.numberOfMealInDay }).map((_, index) => ({
          mealName: `Meal ${index + 1}`,
          meals: [],
        })) ?? [],
      total: 0,
      limit: 0,
      current: 0,
      caloriesList: [],
      weightList: [],
    };
    dispatch(registerInformation(param));
    router.push('/dashboard');
  };

  const handleNextIndex = () => {
    setStepIndex(stepIndex + 1 > maxStep ? 0 : stepIndex + 1);
  };

  const handleBack = () => {
    setStepIndex(stepIndex === 0 ? 0 : stepIndex - 1);
  };

  const textInputStepList: {
    label: string;
    data: (InputItem<string> | InputItem<number>)[];
  }[] = [
    {
      label: 'Your Information',
      data: [
        {
          item: data.name,
          name: 'Name',
          onChangeItem: (item) => {
            setData({
              ...data,
              name: item,
            });
          },
          errors: [
            {
              message: 'Name is required',
              condition: (item) => item === '',
            },
          ],
        },
        {
          item: data.yearOfBirth,
          name: 'Year of Birth',
          onChangeItem: (item) => {
            setData({
              ...data,
              yearOfBirth: item,
            });
          },
        },
      ],
    },
    {
      label: 'Your Sizes',
      data: [
        {
          item: data.weight,
          name: 'Weight (kg)',
          onChangeItem: (item) => {
            setData({
              ...data,
              weight: item,
            });
          },
        },
        {
          item: data.height,
          name: 'Height (cm)',
          onChangeItem: (item) => {
            setData({
              ...data,
              height: item,
            });
          },
        },
      ],
    },
    {
      label: 'Your Goal',
      data: [
        {
          item: data.goalWeight,
          name: 'Goal Weight (cm)',
          onChangeItem: (item) => {
            setData({
              ...data,
              goalWeight: item,
            });
          },
        },
        {
          item: data.deadlineTime,
          name: 'Deadline',
          onChangeItem: (item) => {
            setData({
              ...data,
              deadlineTime: item,
            });
          },
        },
        {
          item: data.numberOfMealInDay,
          name: 'Number of meal in a day',
          onChangeItem: (item) => {
            setData({
              ...data,
              numberOfMealInDay: item,
            });
          },
        },
      ],
    },
  ];

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{
          flex: 1,
          justifyContent: 'space-between',
          paddingHorizontal: 20,
        }}
      >
        <StepInputLayout
          inputList={textInputStepList[stepIndex]}
          maxStep={maxStep}
          currentStepIndex={stepIndex}
        />
        <View style={{ gap: 10, paddingVertical: 10 }}>
          {isShowBackButton ? (
            <TextButton variant="secondary" onPress={handleBack}>
              Back
            </TextButton>
          ) : null}
          {isShowSubmitButton ? (
            <TextButton onPress={handleInitInformation}>Submit</TextButton>
          ) : (
            <TextButton onPress={handleNextIndex}>Next</TextButton>
          )}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
