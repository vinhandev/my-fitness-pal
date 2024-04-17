const ColorsByName = {
  black: '#000',
  white: '#fff',
  grey: '#ddd',
  red: '#FF204E',
};

export const Colors = {
  ...ColorsByName,

  primary: '#33399C',
  secondary: '#16D372',

  border: ColorsByName.grey,
  borderWhenFocus: ColorsByName.black,
  borderWhenError: ColorsByName.red,

  neutral: '#F2F2F2',
  neutral2: '#ECEBF1',

  text1: '#000',
  text2: '#6C6B6F',
} as const;
