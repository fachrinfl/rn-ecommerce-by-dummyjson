import {useTheme} from '@react-navigation/native';
import React from 'react';
import {Text, StyleSheet} from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import {
  GestureHandlerRootView,
  LongPressGestureHandler,
  State,
} from 'react-native-gesture-handler';
import {Theme} from '../constants/types/theme';
import {Fonts} from '../constants';

type IProps = {
  text: string;
};

const HoldableText: React.FC<IProps> = ({text}) => {
  const theme = useTheme() as unknown as Theme;
  const styles = createStyles(theme);

  const onLongPress = ({nativeEvent}: {nativeEvent: {state: number}}) => {
    if (nativeEvent.state === State.ACTIVE) {
      Clipboard.setString(text);
    }
  };

  return (
    <GestureHandlerRootView>
      <LongPressGestureHandler
        onHandlerStateChange={onLongPress}
        minDurationMs={800}>
        <Text style={[styles.descriptionProduct]}>{text}</Text>
      </LongPressGestureHandler>
    </GestureHandlerRootView>
  );
};

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    descriptionProduct: {
      fontFamily: Fonts.regular,
      fontSize: 14,
      color: theme.colors.headerText,
      marginTop: 10,
    },
  });

export default HoldableText;
