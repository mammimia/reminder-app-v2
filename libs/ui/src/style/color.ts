const sharedColors = {
  black: '#000000',
  white: '#ffffff',
};

export type ColorTheme = {
  primary: string;
  secondary: string;
  accent: string;
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
