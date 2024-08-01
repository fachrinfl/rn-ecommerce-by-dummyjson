import {useTheme} from '@react-navigation/native';
import {NativeStackNavigationOptions} from '@react-navigation/native-stack';
import {Fonts} from '../constants';
import {Theme} from '../constants/types/theme';

const useNavigationScreenOptions = (): NativeStackNavigationOptions => {
  const theme = useTheme() as Theme;
  return {
    headerShown: true,
    gestureEnabled: false,
    headerTitleStyle: {
      fontFamily: Fonts.bold,
      color: theme.colors.text,
    },
  };
};

export default useNavigationScreenOptions;
