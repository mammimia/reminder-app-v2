import { createContext, FC, useState } from 'react';
import Colors, { TColors } from './color';

type ThemeContextType = {
  colors: TColors;
  applyColors: (colors: TColors) => void;
};

const ThemeContext = createContext<ThemeContextType | null>(null);

type Props = {
  children?: React.ReactNode;
};

const ThemeProvider: FC<Props> = ({ children }) => {
  const [colors, setColors] = useState(Colors.light);

  const applyColors = (colorTheme: TColors) => {
    setColors(colorTheme);
  };

  return (
    <ThemeContext.Provider value={{ colors, applyColors }}>
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeContext, ThemeProvider };
