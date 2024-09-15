const sharedColors = {
  black: '#000000',
  white: '#ffffff',

  yellow100: '#fcd78c',
  yellow200: '#fcd079',
  yellow300: '#fbc965',
  yellow400: '#fbc352',
  yellow500: '#fabc3f',
  yellow600: '#e1a939',
  yellow700: '#c89632',
  yellow800: '#af842c',
  yellow900: '#967126',

  orange100: '#f19d6e',
  orange200: '#ef8d56',
  orange300: '#ed7d3d',
  orange400: '#ea6c25',
  orange500: '#e85c0d',
  orange600: '#d1530c',
  orange700: '#ba4a0a',
  orange800: '#a24009',
  orange900: '#8b3708',

  red100: '#dd7c8b',
  red200: '#d86678',
  red300: '#d25165',
  red400: '#cd3b51',
  red500: '#c7253e',
  red600: '#b32138',
  red700: '#9f1e32',
  red800: '#8b1a2b',
  red900: '#771625',

  maroon100: '#b47083',
  maroon200: '#a8586f',
  maroon300: '#9b415a',
  maroon400: '#8f2946',
  maroon500: '#821131',
  maroon600: '#750f2c',
  maroon700: '#680e27',
  maroon800: '#5b0c22',
  maroon900: '#4e0a1d',

  green100: '#b0cb84',
  green200: '#a3c370',
  green300: '#96ba5b',
  green400: '#89b247',
  green500: '#7ca932',
  green600: '#70982d',
  green700: '#638728',
  green800: '#577623',
  green900: '#4a651e',

  teal100: '#7ababf',
  teal200: '#6db0b0',
  teal300: '#5fa6a0',
  teal400: '#529c91',
  teal500: '#449282',
  teal600: '#3a8480',
  teal700: '#30777e',
  teal800: '#26697c',
  teal900: '#1c5c7a',

  blue100: '#7aa5d3',
  blue200: '#6a9dce',
  blue300: '#5a94c9',
  blue400: '#4a8cc4',
  blue500: '#3a83bf',
  blue600: '#2a7bb9',
  blue700: '#1a72b4',
  blue800: '#0a6aaf',
  blue900: '#0061aa',

  indigo100: '#8a7cc4',
  indigo200: '#7c6eb6',
  indigo300: '#6f60a8',
  indigo400: '#61529a',
  indigo500: '#54448c',
  indigo600: '#47367e',
  indigo700: '#3a2870',
  indigo800: '#2c1a62',
  indigo900: '#1f0c54',

  darkblue100: '#82919b',
  darkblue200: '#6d7f8a',
  darkblue300: '#596d79',
  darkblue400: '#445a69',
  darkblue500: '#2f4858',
  darkblue600: '#21323e',
  darkblue700: '#263a46',
  darkblue800: '#2a414f',
  darkblue900: '#2f4858',

  gray100: '#f5f5f5',
  gray200: '#eeeeee',
  gray300: '#e0e0e0',
  gray400: '#bdbdbd',
  gray500: '#9e9e9e',
  gray600: '#757575',
  gray700: '#616161',
  gray800: '#424242',
  gray900: '#212121',
};

export type ColorTheme = {
  primary: string;
  secondary: string;
  accent: string;
  text: string;
  background: string;
  surface: string;
  error: string;
  success: string;
  warning: string;
  info: string;
};

type SharedColors = typeof sharedColors;

export type TColors = ColorTheme & SharedColors;

type ColorPalettes = {
  light: TColors;
  dark: TColors;
};

const Colors: ColorPalettes = {
  light: {
    primary: '#6200ee',
    secondary: '#03dac6',
    accent: '#03dac6',
    text: '#000000',
    background: '#f6f6f6',
    surface: '#ffffff',
    error: '#b00020',
    success: '#00c853',
    warning: '#ffab00',
    info: '#2979ff',
    ...sharedColors,
  },
  dark: {
    primary: '#bb86fc',
    secondary: '#03dac6',
    accent: '#03dac6',
    text: '#ffffff',
    background: '#121212',
    surface: '#121212',
    error: '#cf6679',
    success: '#4caf50',
    warning: '#ffab00',
    info: '#2196f3',
    ...sharedColors,
  },
};

export default Colors;
