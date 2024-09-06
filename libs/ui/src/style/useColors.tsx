import { useContext } from 'react';
import { TColors } from './color';
import { ThemeContext } from './theme';

type ColorType = {
  colors: TColors;
  applyColors: (colors: TColors) => void;
};

const useColors = (): ColorType => {
  const store = useContext(ThemeContext);

  if (!store) {
    throw new Error('useColors must be used within a ThemeProvider');
  }

  return {
    colors: store.colors,
    applyColors: store.applyColors,
  };
};

export { useColors };
