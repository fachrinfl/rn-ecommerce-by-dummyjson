/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {SvgXml} from 'react-native-svg';
import {Fonts, Icon} from '../../../constants';
import {useTheme} from '@react-navigation/native';
import {Theme} from '../../../constants/types/theme';
import {useTranslation} from 'react-i18next';
import {LanguageSwitch, ThemeSwitch} from '../../../components';

const AccountTabScreen: React.FC = () => {
  const theme = useTheme() as unknown as Theme;
  const styles = createStyles(theme);
  const {t} = useTranslation();

  return (
    <View style={styles.container}>
      <View style={styles.accountContainer}>
        <SvgXml
          xml={Icon.circleUserSolid(theme.colors.placeHolder)}
          width={64}
          height={64}
        />
        <View
          style={{
            marginLeft: 10,
          }}>
          <Text style={styles.name}>Fachri Naufal</Text>
          <Text style={styles.email}>fachrinaufal@gmail.com</Text>
        </View>
      </View>
      <View style={[styles.itemContainer, {paddingTop: 30}]}>
        <View style={styles.actionContainer}>
          <SvgXml
            xml={Icon.houseChimneyFloorSolid(theme.colors.placeHolder)}
            width={24}
            height={24}
          />
          <Text style={styles.title}>{t('account.address')}</Text>
        </View>
      </View>
      <View style={styles.itemContainer}>
        <View style={styles.actionContainer}>
          <SvgXml
            xml={Icon.unlockAltSolid(theme.colors.placeHolder)}
            width={24}
            height={24}
          />
          <Text style={styles.title}>{t('account.accountSecurity')}</Text>
        </View>
      </View>
      <View style={styles.itemContainer}>
        <View style={styles.actionContainer}>
          <SvgXml
            xml={Icon.bellSolid(theme.colors.placeHolder)}
            width={24}
            height={24}
          />
          <Text style={styles.title}>{t('account.notifications')}</Text>
        </View>
      </View>
      <View style={styles.itemContainer}>
        <View style={styles.actionContainer}>
          <SvgXml
            xml={Icon.englishToChineseSolid(theme.colors.placeHolder)}
            width={24}
            height={24}
          />
          <Text style={styles.title}>{t('account.changeLanguage')}</Text>
        </View>
        <LanguageSwitch />
      </View>
      <View style={styles.itemContainer}>
        <View style={styles.actionContainer}>
          <SvgXml
            xml={Icon.circleHalfStrokeSolid(theme.colors.placeHolder)}
            width={24}
            height={24}
          />
          <Text style={styles.title}>{t('account.mode')}</Text>
        </View>
        <ThemeSwitch />
      </View>
      <View style={styles.itemContainer}>
        <View style={styles.actionContainer}>
          <SvgXml
            xml={Icon.fileAltSolid(theme.colors.placeHolder)}
            width={24}
            height={24}
          />
          <Text style={styles.title}>{t('account.terms&Conditions')}</Text>
        </View>
      </View>
      <View style={styles.itemContainer}>
        <View style={styles.actionContainer}>
          <SvgXml
            xml={Icon.shieldKeyholeSolid(theme.colors.placeHolder)}
            width={24}
            height={24}
          />
          <Text style={styles.title}>{t('account.privacyPolicy')}</Text>
        </View>
      </View>
      <View style={styles.itemContainer}>
        <View style={styles.actionContainer}>
          <SvgXml
            xml={Icon.arrowRightToBracketSolid(theme.colors.placeHolder)}
            width={24}
            height={24}
          />
          <Text style={styles.title}>{t('account.logout')}</Text>
        </View>
      </View>
    </View>
  );
};

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    accountContainer: {
      flexDirection: 'row',
      padding: 20,
      alignItems: 'center',
      borderBottomWidth: 8,
      borderColor: theme.colors.border,
    },
    name: {
      fontFamily: Fonts.bold,
      fontSize: 18,
      color: theme.colors.headerText,
    },
    email: {
      fontFamily: Fonts.semiBold,
      fontSize: 14,
      textAlign: 'center',
      color: theme.colors.placeHolder,
    },
    title: {
      fontFamily: Fonts.semiBold,
      fontSize: 16,
      marginBottom: 5,
      color: theme.colors.headerText,
      marginLeft: 14,
    },
    itemContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingVertical: 20,
    },
    actionContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

export default AccountTabScreen;
