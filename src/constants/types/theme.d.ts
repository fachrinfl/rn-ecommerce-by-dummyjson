export interface ThemeColors {
  background: string;
  border: string;
  button: string;
  buttonText: string;
  card: string;
  headerBackground: string;
  headerText: string;
  placeHolder: string;
  primary: string;
  secondary: string;
  tabBarBackground: string;
  tabBarIcon: string;
  text: string;
  errorText: string;
}

export interface Theme {
  colors: ThemeColors;
  dark: boolean;
}
