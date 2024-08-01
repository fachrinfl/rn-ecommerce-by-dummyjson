import React from 'react';
import {StatusBar} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootNavigatorParamList} from './navigation';
import {useTheme} from '@react-navigation/native';
import useNavigationScreenOptions from './useNavigationScreenOptions';
import {Theme} from '../constants/types/theme';

const Stack = createNativeStackNavigator<RootNavigatorParamList>();

import MainScreen from './MainBottomTabNavigator';

const StackNavigator: React.FC = () => {
  const theme = useTheme() as unknown as Theme;
  const screenOptions = useNavigationScreenOptions();

  return (
    <>
      <StatusBar
        backgroundColor={theme.colors.background}
        barStyle={theme.dark ? 'light-content' : 'dark-content'}
      />
      <Stack.Navigator screenOptions={screenOptions}>
        <Stack.Screen
          name="Main"
          component={MainScreen}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </>
  );
};

export default StackNavigator;
