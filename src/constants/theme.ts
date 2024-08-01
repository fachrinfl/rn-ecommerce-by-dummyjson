import {DefaultTheme, DarkTheme} from '@react-navigation/native';
import {Theme} from './types/theme';
import Colors from './colors';

const lightTheme: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    ...Colors.lightThemeColors,
  },
};

const darkTheme: Theme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    ...Colors.darkThemeColors,
  },
};

const NavigationTheme = {lightTheme, darkTheme};

export default NavigationTheme;
