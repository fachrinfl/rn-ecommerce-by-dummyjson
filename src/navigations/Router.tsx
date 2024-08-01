/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import StackNavigator from './StackNavigator';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {useTheme} from '../constants/ThemeContext';
import {NavigationTheme} from '../constants';
import {useTranslation} from 'react-i18next';
import {navigationRef} from './navigationHelpers';

const Router: React.FC = () => {
  const {isDarkMode, language} = useTheme();
  const {i18n} = useTranslation();
  const theme = isDarkMode
    ? NavigationTheme.darkTheme
    : NavigationTheme.lightTheme;

  useEffect(() => {
    i18n.changeLanguage(language as string);
  }, [language]);

  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={style.container}>
        <NavigationContainer ref={navigationRef} theme={theme}>
          <StackNavigator />
        </NavigationContainer>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Router;
