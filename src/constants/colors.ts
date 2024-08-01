import {ThemeColors as ThemeColorsType} from './types/theme';

const lightThemeColors: ThemeColorsType = {
  primary: '#1299DA',
  secondary: '#92D8F7',
  background: '#FFFFFF',
  card: '#FFFFFF',
  text: '#31393F',
  border: '#E6EBF1',
  placeHolder: '#72849A80',
  button: '#1299DA',
  buttonText: '#FFFFFF',
  headerBackground: '#FFFFFF',
  headerText: '#081A4A',
  tabBarBackground: '#FFFFFF',
  tabBarIcon: '#72849A7F',
  errorText: '#D32F2F',
};

const darkThemeColors: ThemeColorsType = {
  primary: '#1299DA',
  secondary: '#467A9B',
  background: '#121212',
  card: '#1E1E1E',
  text: '#E0E0E0',
  border: '#373737',
  placeHolder: '#b9d7eab2',
  button: '#26A69A',
  buttonText: '#FFFFFF',
  headerBackground: '#1C1C1C',
  headerText: '#FFFFFF',
  tabBarBackground: '#2C2C2C',
  tabBarIcon: '#ffffff7f',
  errorText: '#EF9A9A',
};

const ThemeColors = {lightThemeColors, darkThemeColors};

export default ThemeColors;
