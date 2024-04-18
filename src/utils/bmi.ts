import { GenderList } from '../components/Inputs/GenderInput/GenderInput';

export const calculateBMR = (
  gender: number,
  weight: number,
  height: number,
  age: number,
  activitiesLevel: number
) => {
  const BMR =
    gender === GenderList.MALE
      ? (88.362 + 13.397 * weight + 4.799 * height - 5.677 * age) *
        activitiesLevel
      : (447.593 + 9.247 * weight + 3.098 * height - 4.33 * age) *
        activitiesLevel;

  return Math.round(BMR);
};
