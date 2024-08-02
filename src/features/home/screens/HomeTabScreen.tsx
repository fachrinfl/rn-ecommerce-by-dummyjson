import React from 'react';
import {View, StyleSheet, ActivityIndicator} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {useTheme} from '@react-navigation/native';
import {useCategories} from '../../../api/hooks/useCategories';
import {Theme} from '../../../constants/types/theme';
import {Fonts} from '../../../constants';
import ProductScreen from './ProductScreen';

const Tab = createMaterialTopTabNavigator();

const HomeTabScreen = () => {
  const theme = useTheme() as unknown as Theme;
  const {data, isLoading} = useCategories();

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarScrollEnabled: true,
        tabBarLabelStyle: {
          textTransform: 'capitalize',
          fontFamily: Fonts.bold,
        },
        tabBarGap: 0,
      }}>
      {data?.map((item, index) => (
        <Tab.Screen
          key={index}
          name={item.slug}
          children={() => <ProductScreen category={item.slug} />}
          options={{
            title: item.name,
          }}
        />
      ))}
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeTabScreen;
