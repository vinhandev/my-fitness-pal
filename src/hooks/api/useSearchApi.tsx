import { gql, useLazyQuery, useQuery } from '@apollo/client';
import { FoodData } from '../../types';
import { useMemo } from 'react';

const query = gql`
  query search($ingr: String) {
    search(ingr: $ingr) {
      text
      hints {
        food {
          label
          nutrients {
            ENERC_KCAL
          }
          foodId
        }
      }
    }
  }
`;

export const useSearchApi = () => {
  const [search, { data, loading, error }] = useLazyQuery(query);
  const result: FoodData[] = useMemo(() => {
    const tmpResult: FoodData[] =
      data?.search?.hints?.map((hint) => ({
        name: hint.food.label,
        kcal: hint.food.nutrients.ENERC_KCAL,
        quantity: 0,
        unitType: '',
        from: '',
        isVerified: false,
      })) ?? [];
    return tmpResult;
  }, [data]);
  return {
    search,
    loading,
    error,
    data: result,
  };
};
