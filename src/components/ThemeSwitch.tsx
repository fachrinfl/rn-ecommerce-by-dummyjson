import React from 'react';
import {Animated, TouchableOpacity, View, StyleSheet} from 'react-native';
import {useTheme as useThemeSwitch} from '../constants/ThemeContext';
import {SvgXml} from 'react-native-svg';
import {Icon} from '../constants';
import {useTheme} from '@react-navigation/native';
import {Theme} from '../constants/types/theme';

const ThemeSwitch: React.FC = () => {
  const {isDarkMode, setIsDarkMode} = useThemeSwitch();
  const theme = useTheme() as unknown as Theme;
  const styles = createStyles();

  const toggleAnimation = new Animated.Value(isDarkMode ? 1 : 0);

  const animateSwitch = () => {
    Animated.timing(toggleAnimation, {
      toValue: isDarkMode ? 0 : 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const handleToggle = () => {
    animateSwitch();
    setIsDarkMode(!isDarkMode);
  };

  const knobColor = toggleAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [theme.colors.background, theme.colors.background],
  });

  const knobPosition = toggleAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0.1, 22],
  });

  return (
    <TouchableOpacity onPress={handleToggle}>
      <View style={styles.container}>
        <Animated.View
          style={[
            styles.selected,
            {
              backgroundColor: knobColor,
              transform: [{translateX: knobPosition}],
            },
          ]}>
          <SvgXml
            xml={Icon.sunny(theme.colors.primary)}
            width={16}
            height={16}
          />
        </Animated.View>
      </View>
    </TouchableOpacity>
  );
};

const createStyles = () =>
  StyleSheet.create({
    container: {
      width: 50,
      height: 26,
      backgroundColor: '#E9E9E9',
      borderRadius: 13,
      padding: 2,
      justifyContent: 'center',
    },
    selected: {
      width: 22,
      height: 22,
      borderRadius: 11,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

export default ThemeSwitch;
