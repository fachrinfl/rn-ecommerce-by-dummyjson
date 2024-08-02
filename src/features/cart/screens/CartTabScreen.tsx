/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useCallback} from 'react';
import {View, StyleSheet, FlatList, Text, TouchableOpacity} from 'react-native';
import {useSelector} from 'react-redux';
import {RootState} from '../../../redux/store';
import {CartItem} from '../../../components';
import {Product} from '../../../api/types/product';
import {SvgXml} from 'react-native-svg';
import {useTheme} from '@react-navigation/native';
import {Theme} from '../../../constants/types/theme';
import {Fonts, Icon} from '../../../constants';
import {useTranslation} from 'react-i18next';
import {calculateTotal} from '../../../utils/Helpers';

const CartTabScreen: React.FC = () => {
  const theme = useTheme() as unknown as Theme;
  const styles = createStyles(theme);
  const cart = useSelector((state: RootState) => state.cart);
  const {t} = useTranslation();

  const renderItem = useCallback(
    ({item}: {item: Product}) => <CartItem item={item} />,
    [],
  );

  const renderEmpty = useCallback(
    () => (
      <View style={styles.emptyContainer}>
        <SvgXml
          xml={Icon.cartShoppingSolid(theme.colors.placeHolder)}
          width={64}
          height={64}
        />
        <Text style={styles.title}>{t('cart.emptyMessage')}</Text>
        <Text style={styles.desc}>{t('cart.description')}</Text>
      </View>
    ),
    [],
  );

  const keyExtractor = useCallback((item: Product) => item.id.toString(), []);

  return (
    <View style={styles.container}>
      <FlatList
        data={cart || []}
        keyExtractor={keyExtractor}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.containerList}
        renderItem={renderItem}
        ListEmptyComponent={renderEmpty}
        ListFooterComponent={() =>
          Boolean(cart.length) && (
            <View>
              <View style={styles.footerContainer}>
                <Text style={styles.desc}>Total</Text>
                <Text
                  style={[
                    styles.title,
                    {marginBottom: 0, marginTop: 0},
                  ]}>{`${calculateTotal(cart)}`}</Text>
              </View>
              <TouchableOpacity
                style={styles.btnCheckout}
                activeOpacity={0.8}
                onPress={() => {}}>
                <Text style={styles.labelCheckout}>{t('cart.checkout')}</Text>
              </TouchableOpacity>
            </View>
          )
        }
      />
    </View>
  );
};

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    emptyContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 100,
    },
    container: {
      flex: 1,
    },
    containerList: {
      flexGrow: 1,
      padding: 20,
      paddingBottom: 100,
    },
    title: {
      fontFamily: Fonts.bold,
      fontSize: 18,
      marginBottom: 15,
      color: theme.colors.headerText,
      textAlign: 'center',
      marginTop: 20,
    },
    desc: {
      fontFamily: Fonts.semiBold,
      fontSize: 14,
      textAlign: 'center',
      color: theme.colors.placeHolder,
    },
    btnCheckout: {
      borderRadius: 10,
      paddingVertical: 16,
      backgroundColor: theme.colors.primary,
      justifyContent: 'center',
      alignItems: 'center',
    },
    labelCheckout: {
      fontFamily: Fonts.bold,
      fontSize: 18,
      color: theme.colors.background,
      marginLeft: 15,
    },
    footerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 10,
    },
  });

export default CartTabScreen;
