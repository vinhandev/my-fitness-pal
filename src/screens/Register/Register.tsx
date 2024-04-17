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
  InputListProps,
} from '../../components/StepInputLayout/StepInputLayout';
import TextButton from '../../components/Buttons/TextButton/TextButton';
import { router } from 'expo-router';

type FormData = {
  name: string;
  yearOfBirth: number;
  weight: number;
  height: number;
  numberOfMealInDay: number;
  deadlineTime: number;
  goalWeight: number;
  gender: number;
};
export default function RegisterScreen() {
  const dispatch = useDispatch();
  const [stepIndex, setStepIndex] = useState<number>(0);
  const [data, setData] = useState<FormData>({
    name: '',
    yearOfBirth: 0,
    height: 0,
    weight: 0,
    goalWeight: 0,
    deadlineTime: 0,
    numberOfMealInDay: 0,
    gender: 0,
  });

  const handleInitInformation = () => {
    const param: State = {
      gender: data.gender,
      activitiesLevel: 1,
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

  const textInputStepList: InputListProps[] = [
    {
      label: 'Your Information',
      data: [
        {
          value: data.name,
          name: 'Name',
          type: 'string',
          onChangeItem: (item) => {
            if (typeof item === 'string') {
              setData({
                ...data,
                name: item,
              });
            }
          },
          errors: [
            {
              message: 'Name is required',
              onValidate: (item) => item === '',
            },
            {
              message: 'Name must contain at least 2 characters',
              onValidate: (item) => item.length < 2,
            },
            {
              message: 'Name must contain at most 20 characters',
              onValidate: (item) => item.length > 20,
            },
          ],
        },
        {
          value: data.gender,
          name: 'Gender',
          type: 'gender',
          onChangeItem: (item) => {
            setData({
              ...data,
              gender: item,
            });
          },
        },
        {
          value: data.yearOfBirth,
          name: 'Year of Birth',
          type: 'date',
          onChangeItem: (item) => {
            typeof item === 'number' &&
              setData({
                ...data,
                yearOfBirth: item,
              });
          },
          errors: [
            {
              message: 'Year of Birth is required',
              onValidate: (item) => item === 0,
            },
            {
              message: 'Year of Birth must be greater than 1900',
              onValidate: (item) => new Date(item).getFullYear() < 1900,
            },
            {
              message: 'Year of Birth must be less than 2024',
              onValidate: (item) => new Date(item).getFullYear() > 2024,
            },
          ],
        },
      ],
    },
    {
      label: 'Your Sizes',
      data: [
        {
          value: data.weight,
          name: 'Weight (kg)',
          type: 'number',

          onChangeItem: (item) => {
            typeof item === 'number' &&
              setData({
                ...data,
                weight: item,
              });
          },
          errors: [
            {
              message: 'Weight is required',
              onValidate: (item) => item === 0,
            },
            {
              message: 'Weight must be greater than 10',
              onValidate: (item) => item < 10,
            },
            {
              message: 'Year of Birth must be less than 500',
              onValidate: (item) => item > 500,
            },
          ],
        },
        {
          value: data.height,
          name: 'Height (cm)',
          type: 'number',
          onChangeItem: (item) => {
            typeof item === 'number' &&
              setData({
                ...data,
                height: item,
              });
          },
          errors: [
            {
              message: 'Height is required',
              onValidate: (item) => item === 0,
            },
            {
              message: 'Height must be greater than 80',
              onValidate: (item) => item < 80,
            },
            {
              message: 'Height must be less than 250',
              onValidate: (item) => item > 250,
            },
          ],
        },
      ],
    },
    {
      label: 'Your Goal',
      data: [
        {
          value: data.goalWeight,
          name: 'Goal Weight (cm)',
          type: 'number',
          onChangeItem: (item) => {
            typeof item === 'number' &&
              setData({
                ...data,
                goalWeight: item,
              });
          },
          errors: [
            {
              message: 'Goal Weight is required',
              onValidate: (item) => item === 0,
            },
            {
              message: 'Goal Weight must be smaller than curent weight',
              onValidate: (item) => item > data.weight,
            },
            {
              message: 'Goal Weight must be greater than 20',
              onValidate: (item) => item < 20,
            },
          ],
        },
        {
          value: data.deadlineTime,
          name: 'Deadline',
          type: 'date',
          onChangeItem: (item) => {
            typeof item === 'number' &&
              setData({
                ...data,
                deadlineTime: item,
              });
          },
          errors: [
            {
              message: 'Deadline is required',
              onValidate: (item) => item === 0,
            },
            {
              message: 'Deadline must be greater than current day 7 day',
              onValidate: (item) => item <  new Date().getTime() + 7 * 24 * 60 * 60 * 1000,
            },
          ],
        },
        {
          value: data.numberOfMealInDay,
          type: 'number',
          name: 'Number of meal in a day',
          onChangeItem: (item) => {
            typeof item === 'number' &&
              setData({
                ...data,
                numberOfMealInDay: item,
              });
          },
          errors: [
            {
              message: 'Number of meals is required',
              onValidate: (item) => item === 0,
            },
            {
              message: 'Number of meals must be greater than 0',
              onValidate: (item) => item < 0,
            },
            {
              message: 'Number of meals must be less than 10',
              onValidate: (item) => item > 10,
            },
          ],
        },
      ],
    },
  ];

  const numberOfSteps = textInputStepList.length;

  const handleNextIndex = () => {
    setStepIndex(stepIndex + 1 > numberOfSteps ? 0 : stepIndex + 1);
  };

  const handleBack = () => {
    setStepIndex(stepIndex === 0 ? 0 : stepIndex - 1);
  };

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
          numberOfSteps={numberOfSteps}
          currentStepIndex={stepIndex}
          onSubmit={handleInitInformation}
          onBack={handleBack}
          onNext={handleNextIndex}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
