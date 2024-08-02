/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View, Alert} from 'react-native';
import {Product} from '../api/types/product';
import {Theme} from '../constants/types/theme';
import {useTheme} from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import {Fonts, Icon} from '../constants';
import {getPriceDetails} from '../utils/Helpers';
import {SvgXml} from 'react-native-svg';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '../redux/store';
import {useTranslation} from 'react-i18next';
import {deleteCart, addCart, decrementCartQuantity} from '../redux/cartSlice';

type IProps = {
  item: Product;
};

const CartItem: React.FC<IProps> = ({item}) => {
  const theme = useTheme() as unknown as Theme;
  const styles = createStyles(theme);
  const {t} = useTranslation();
  const {discountedPrice, hasDiscount, originalPrice} = getPriceDetails(
    item.price,
    item.discountPercentage,
  );

  const dispatch = useDispatch<AppDispatch>();

  const removeItem = () =>
    Alert.alert(t('cart.removeItem.title'), t('cart.removeItem.desc'), [
      {
        text: t('cart.removeItem.action.no'),
        onPress: () => {},
        style: 'cancel',
      },
      {
        text: t('cart.removeItem.action.yes'),
        onPress: () => dispatch(deleteCart(item.id)),
      },
    ]);

  return (
    <View style={styles.container}>
      <FastImage
        style={styles.image}
        source={{
          uri: item.thumbnail,
          priority: FastImage.priority.normal,
        }}
        resizeMode={FastImage.resizeMode.contain}
      />
      <View style={styles.content}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Text style={styles.title}>{item.title}</Text>
          <TouchableOpacity activeOpacity={0.8} onPress={removeItem}>
            <SvgXml
              xml={Icon.trashSolid(theme.colors.errorText)}
              width={24}
              height={24}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.labelContainer}>
          {!hasDiscount && (
            <Text style={styles.priceDiscount}>${originalPrice}</Text>
          )}
          {hasDiscount && (
            <Text style={styles.priceDiscount}>${discountedPrice}</Text>
          )}
          {hasDiscount && (
            <Text
              style={[
                styles.priceDiscount,
                {
                  textDecorationLine: 'line-through',
                  color: theme.colors.errorText,
                },
              ]}>
              ${originalPrice}
            </Text>
          )}
        </View>
        <View style={styles.actionContainer}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => dispatch(decrementCartQuantity(item.id))}>
            <SvgXml
              xml={Icon.circleMinusSolid(theme.colors.primary)}
              width={28}
              height={28}
            />
          </TouchableOpacity>
          <Text style={[styles.title, {fontSize: 22}]}>{item.quantity}</Text>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => dispatch(addCart(item))}>
            <SvgXml
              xml={Icon.circlePlusSolid(theme.colors.primary)}
              width={28}
              height={28}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      padding: 16,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: theme.colors.border,
      marginBottom: 16,
    },
    image: {
      height: 80,
      width: 80,
      backgroundColor: theme.colors.border,
      borderRadius: 8,
    },
    title: {
      fontFamily: Fonts.semiBold,
      fontSize: 14,
      marginBottom: 5,
      color: theme.colors.headerText,
    },
    content: {
      marginLeft: 15,
      flex: 1,
    },
    labelContainer: {
      flexDirection: 'row',
    },
    typeContainer: {
      backgroundColor: 'rgba(18, 153, 218, 0.2)',
      borderRadius: 4,
      paddingHorizontal: 10,
      paddingVertical: 5,
    },
    typeLabel: {
      fontFamily: Fonts.semiBold,
      fontSize: 14,
      color: theme.colors.primary,
    },
    priceDiscount: {
      fontFamily: Fonts.regular,
      fontSize: 14,
      color: theme.colors.text,
      marginLeft: 4,
    },
    saved: {
      backgroundColor: theme.colors.background,
      position: 'absolute',
      right: 12,
      top: 12,
      padding: 8,
      borderRadius: 10,
    },
    actionContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: 100,
      alignSelf: 'flex-end',
      marginTop: 10,
    },
  });

export default CartItem;
