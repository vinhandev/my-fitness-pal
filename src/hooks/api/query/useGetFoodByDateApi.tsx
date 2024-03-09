import { gql, useQuery } from '@apollo/client';
import { MealData } from '../../../types';
import { useMemo } from 'react';
import dayjs from 'dayjs';

const query = gql`
  query logFoods($date: Date!, $user_id: String!) {
    logFoods(date: $date, user_id: $user_id) {
      created_at
      food_id
      user_id
      kcal
      label
    }
  }
`;
export const useGetFoodByDateApi = (date: Date, user_id: string) => {
  console.log(dayjs(date).format('YYYY-MM-DD'));

  const { data, loading, error } = useQuery(query, {
    variables: {
      date: dayjs(date).subtract(1, 'day').format('YYYY-MM-DD'),
      user_id,
    },
  });

  console.log(data);

  const result: MealData[] = useMemo(() => {
    const tmpResult: MealData[] = [
      {
        name: 'Foods',
        kcal: 100,
        foods:
          data?.logFoods?.map((item) => ({
            id: item.food_id,
            name: item.label,
            kcal: item.kcal,
            quantity: 1,
            unitType: '',
            from: '',
            isVerified: false,
          })) ?? [],
      },
    ];
    return tmpResult;
  }, [data]);

  return {
    data: result,
    loading,
    error,
  };
};
