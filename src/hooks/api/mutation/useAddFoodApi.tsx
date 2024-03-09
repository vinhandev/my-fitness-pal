import { gql, useMutation } from '@apollo/client';

const mutation = gql`
  mutation insertFood_log(
    $user_id: String!
    $food_id: String!
    $kcal: Int!
    $label: String!
  ) {
    insertFood_log(
      user_id: $user_id
      food_id: $food_id
      kcal: $kcal
      label: $label
    ) {
      food_id
    }
  }
`;
export const useAddFoodApi = () => {
  return useMutation(mutation,{
    refetchQueries: ['logFoods'],
  });
};
