import React from 'react';
import {View, TouchableOpacity, Animated, StyleSheet} from 'react-native';
import {useTheme as useThemeSwitch} from '../constants/ThemeContext';
import {SvgXml} from 'react-native-svg';
import {Icon} from '../constants';
import {Theme, useTheme} from '@react-navigation/native';

const LanguageSwitch: React.FC = () => {
  const {language, setLanguage} = useThemeSwitch();
  const theme = useTheme() as Theme;
  const styles = createStyles(theme);

  const animateSwitch = new Animated.Value(language === 'en' ? 0 : 1);

  const toggleLanguage = () => {
    const newLanguage = language === 'en' ? 'id' : 'en';
    setLanguage(newLanguage);
    Animated.timing(animateSwitch, {
      toValue: newLanguage === 'en' ? 0 : 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const knobPosition = animateSwitch.interpolate({
    inputRange: [0, 1],
    outputRange: [2, 38],
  });

  return (
    <TouchableOpacity onPress={toggleLanguage} activeOpacity={0.7}>
      <View style={styles.container}>
        <Animated.View
          style={[
            styles.selected,
            {
              transform: [{translateX: knobPosition}],
            },
          ]}
        />
        <SvgXml xml={Icon.english} width={22} height={22} />
        <SvgXml xml={Icon.indonesia} width={22} height={22} />
      </View>
    </TouchableOpacity>
  );
};

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      width: 70,
      height: 34,
      backgroundColor: '#E9E9E9',
      borderRadius: 17,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 6,
    },
    selected: {
      position: 'absolute',
      width: 30,
      height: 30,
      borderRadius: 15,
      backgroundColor: theme.colors.primary,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

export default LanguageSwitch;
