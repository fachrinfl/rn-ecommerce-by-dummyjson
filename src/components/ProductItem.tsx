/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Product} from '../api/types/product';
import {Theme} from '../constants/types/theme';
import {useTheme} from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import {Fonts, Icon} from '../constants';
import {getPriceDetails} from '../utils/Helpers';
import {useNavigation} from '@react-navigation/native';
import {ProductNavigationProp} from '../navigations/navigation';
import {SvgXml} from 'react-native-svg';

type IProps = {
  item: Product;
};

const ProductItem: React.FC<IProps> = ({item}) => {
  const theme = useTheme() as unknown as Theme;
  const styles = createStyles(theme);
  const navigation = useNavigation<ProductNavigationProp>();
  const {discountedPrice, hasDiscount, originalPrice} = getPriceDetails(
    item.price,
    item.discountPercentage,
  );

  const onPressHandler = (): void => {
    navigation.navigate('ProductDetail', {
      productId: String(item.id),
    });
  };

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={styles.container}
      onPress={onPressHandler}>
      <View>
        <FastImage
          style={styles.image}
          source={{
            uri: item.thumbnail,
            priority: FastImage.priority.normal,
          }}
          resizeMode={FastImage.resizeMode.contain}
        />
        <View style={styles.saved}>
          <SvgXml
            xml={Icon.heartLinear(theme.colors.errorText)}
            width={24}
            height={24}
          />
        </View>
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>{item.title}</Text>
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
      </View>
    </TouchableOpacity>
  );
};

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      margin: 10,
    },
    image: {
      height: 200,
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
      marginVertical: 15,
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
  });

export default ProductItem;
