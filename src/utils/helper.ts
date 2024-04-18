export const getValueByConditionList = <T>(
  list: {
    returnValue: T;
    condition: boolean;
  }[] = [],
  defaultValue: T = null
) => {
  for (let index = 0; index < list.length; index++) {
    const { condition, returnValue } = list[index];
    if (condition) return returnValue;
  }
  return defaultValue;
};

export const getValueByVariableList = <T>(
  value: T,
  list: {
    returnVariable: any;
    compareVariable: T;
  }[],
  defaultValue: T = null
) => {
  for (let index = 0; index < list.length; index++) {
    const { returnVariable, compareVariable } = list[index];
    if (compareVariable === value) return returnVariable;
  }
  return defaultValue;
};

export const getAgeFromDate = (date: Date) => {
  const today = new Date();
  const birthDate = new Date(date);
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  return age;
};
