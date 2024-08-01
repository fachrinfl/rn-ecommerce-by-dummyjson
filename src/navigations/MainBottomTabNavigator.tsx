/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
import React, {useEffect, useRef} from 'react';
import {Animated, Keyboard} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useTheme} from '@react-navigation/native';
import {SvgXml} from 'react-native-svg';
import {useTranslation} from 'react-i18next';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Fonts, Icon} from '../constants';
import {MainBottomTabNavigatorParamList} from './navigation';
import {Theme} from '../constants/types/theme';

import {HomeTabScreen} from '../features/home';
import {SearchTabScreen} from '../features/search';
import {SavedTabScreen} from '../features/saved';
import {CartTabScreen} from '../features/cart';
import {AccountTabScreen} from '../features/account';

const Tab = createBottomTabNavigator<MainBottomTabNavigatorParamList>();

const MainBottomTabNavigator = () => {
  const theme = useTheme() as Theme;
  const {t} = useTranslation();
  const translateY = useRef(new Animated.Value(0)).current;
  const insets = useSafeAreaInsets();
  const baseTabBarHeight = 50;
  const bottomTabBarHeight = baseTabBarHeight + insets.bottom;

  useEffect(() => {
    const keyboardShowListener = Keyboard.addListener('keyboardDidShow', () => {
      Animated.timing(translateY, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    });

    const keyboardHideListener = Keyboard.addListener('keyboardDidHide', () => {
      Animated.timing(translateY, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    });

    return () => {
      keyboardShowListener.remove();
      keyboardHideListener.remove();
    };
  }, [translateY]);

  return (
    <>
      <Animated.View style={{flex: 1}}>
        <Tab.Navigator
          screenOptions={{
            tabBarShowLabel: true,
            tabBarActiveTintColor: theme.colors.primary,
            tabBarInactiveTintColor: theme.colors.tabInActive,
            tabBarLabelStyle: {
              fontSize: 12,
              fontFamily: Fonts.medium,
            },
            tabBarStyle: {
              paddingBottom: 5,
              position: 'absolute',
              height: bottomTabBarHeight,
              bottom: 0,
              left: 0,
              right: 0,
              transform: [
                {
                  translateY: translateY.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, bottomTabBarHeight],
                  }),
                },
              ],
            },
          }}>
          <Tab.Screen
            name="HomeTab"
            component={HomeTabScreen}
            options={{
              tabBarLabel: t('home.bottomTab'),
              headerShown: true,
              tabBarIcon: ({color, size, focused}) => (
                <SvgXml
                  xml={
                    focused
                      ? Icon.houseSmileSolid(color)
                      : Icon.houseSmileLinear(color)
                  }
                  color={color}
                  width={size}
                  height={size}
                />
              ),
            }}
          />
          <Tab.Screen
            name="SearchTab"
            component={SearchTabScreen}
            options={{
              tabBarLabel: t('search.bottomTab'),
              headerShown: true,
              tabBarIcon: ({color, size, focused}) => (
                <SvgXml
                  xml={
                    focused
                      ? Icon.searchAltSolid(color)
                      : Icon.searchAltLinear(color)
                  }
                  color={color}
                  width={size}
                  height={size}
                />
              ),
            }}
          />
          <Tab.Screen
            name="SavedTab"
            component={SavedTabScreen}
            options={{
              tabBarLabel: t('saved.bottomTab'),
              headerShown: true,
              tabBarIcon: ({color, size, focused}) => (
                <SvgXml
                  xml={
                    focused ? Icon.heartSolid(color) : Icon.heartLinear(color)
                  }
                  color={color}
                  width={size}
                  height={size}
                />
              ),
            }}
          />
          <Tab.Screen
            name="CartTab"
            component={CartTabScreen}
            options={{
              tabBarLabel: t('cart.bottomTab'),
              headerShown: true,
              tabBarIcon: ({color, size, focused}) => (
                <SvgXml
                  xml={
                    focused
                      ? Icon.cartShoppingSolid(color)
                      : Icon.cartShoppingLinear(color)
                  }
                  color={color}
                  width={size}
                  height={size}
                />
              ),
            }}
          />
          <Tab.Screen
            name="AccountTab"
            component={AccountTabScreen}
            options={{
              tabBarLabel: t('account.bottomTab'),
              headerShown: true,
              tabBarIcon: ({color, size, focused}) => (
                <SvgXml
                  xml={
                    focused
                      ? Icon.circleUserSolid(color)
                      : Icon.circleUserLinear(color)
                  }
                  color={color}
                  width={size}
                  height={size}
                />
              ),
            }}
          />
        </Tab.Navigator>
      </Animated.View>
    </>
  );
};

export default MainBottomTabNavigator;
