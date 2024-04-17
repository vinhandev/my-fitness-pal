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
