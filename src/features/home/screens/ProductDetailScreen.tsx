/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
import React, {useCallback} from 'react';
import {useRoute, useTheme} from '@react-navigation/native';
import {
  StyleSheet,
  View,
  ActivityIndicator,
  RefreshControl,
  Text,
  Dimensions,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {ProductDetailRouteProp} from '../../../navigations/navigation';
import {
  useProductById,
  useProductsByCategory,
} from '../../../api/hooks/useProducts';
import Carousel from 'react-native-reanimated-carousel';
import FastImage from 'react-native-fast-image';
import {getPriceDetails} from '../../../utils/Helpers';
import {HoldableText, ProductItem} from '../../../components';
import {useTranslation} from 'react-i18next';
import {Theme} from '../../../constants/types/theme';
import {Fonts, Icon} from '../../../constants';
import {SvgXml} from 'react-native-svg';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../../redux/store';
import {addSaved, deleteSaved} from '../../../redux/savedSlice';
import {addCart} from '../../../redux/cartSlice';
import {Product} from '../../../api/types/product';
import {configs} from '../../../constants/configs';
import Toast from 'react-native-simple-toast';

const {width} = Dimensions.get('screen');

const ProductDetail: React.FC = () => {
  const {t} = useTranslation();
  const theme = useTheme() as unknown as Theme;
  const styles = createStyles(theme);
  const route = useRoute<ProductDetailRouteProp>();
  const {productId} = route.params;
  const {data, refetch, isLoading} = useProductById(productId);
  const {discountedPrice, hasDiscount, originalPrice} = getPriceDetails(
    data?.price || 0,
    data?.discountPercentage || 0,
  );
  const {data: dataProductsByCategory} = useProductsByCategory(
    data?.category,
    Boolean(data?.category),
    {
      limit: configs.limitRelatedProductPage,
    },
  );

  const saved = useSelector((state: RootState) => state.saved);

  const dispatch = useDispatch<AppDispatch>();

  const isSaved = Boolean(saved.find(itemSaved => itemSaved.id === data?.id));

  const ProductInfo = (label: string, info: string) => {
    return (
      <View style={styles.productInfoContainer}>
        <Text style={styles.productInfoLabel}>{label}</Text>
        <Text style={styles.productInfo}>{info}</Text>
      </View>
    );
  };

  const renderItem = useCallback(
    ({item}: {item: Product}) => <ProductItem item={item} />,
    [],
  );

  const keyExtractor = useCallback((item: Product) => item.id.toString(), []);

  return (
    <View style={styles.screenContainer}>
      <FlatList
        data={
          dataProductsByCategory?.pages.filter(page => page.id !== data?.id) ||
          []
        }
        keyExtractor={keyExtractor}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={() => (
          <>
            {isLoading && (
              <ActivityIndicator size="large" color={theme.colors.primary} />
            )}
            {!isLoading && (
              <>
                <View>
                  <Carousel
                    width={width}
                    height={400}
                    enabled={data!.images.length > 1}
                    data={data?.images || []}
                    renderItem={({item}) => (
                      <FastImage
                        style={styles.image}
                        source={{
                          uri: item,
                          priority: FastImage.priority.normal,
                        }}
                        resizeMode={FastImage.resizeMode.contain}
                      />
                    )}
                  />
                  <TouchableOpacity
                    style={styles.saved}
                    activeOpacity={0.8}
                    onPress={() =>
                      dispatch(
                        isSaved
                          ? deleteSaved(data!.sku)
                          : addSaved(data as Product),
                      )
                    }>
                    <SvgXml
                      xml={
                        isSaved
                          ? Icon.heartSolid(theme.colors.errorText)
                          : Icon.heartLinear(theme.colors.errorText)
                      }
                      width={24}
                      height={24}
                    />
                  </TouchableOpacity>
                </View>
                <View style={styles.detailContainer}>
                  <View style={styles.priceContainer}>
                    {!hasDiscount && (
                      <Text style={styles.price}>{originalPrice}</Text>
                    )}
                    {hasDiscount && (
                      <Text style={styles.price}>${discountedPrice}</Text>
                    )}
                    {hasDiscount && (
                      <Text style={styles.discountPrice}>${originalPrice}</Text>
                    )}
                    {hasDiscount && (
                      <Text style={styles.discountPercentage}>
                        {data?.discountPercentage}%
                      </Text>
                    )}
                  </View>
                  <View style={styles.ratingContainer}>
                    <SvgXml xml={Icon.startSolid()} width={20} height={20} />
                    <Text style={[styles.productInfo, {marginLeft: 10}]}>
                      {data?.rating}/5{' '}
                      {data?.reviews.length ? (
                        <Text style={styles.productInfoLabel}>
                          ({data?.reviews.length} {t('home.reviews')})
                        </Text>
                      ) : null}
                    </Text>
                  </View>
                  <Text style={styles.name}>{data?.title}</Text>
                  {ProductInfo(t('category') as string, data?.category || '')}
                  {ProductInfo(t('brand') as string, data?.brand || '')}
                  {ProductInfo(t('sku') as string, data?.sku || '')}
                  {ProductInfo(
                    t('minOrder') as string,
                    String(data?.minimumOrderQuantity) || '',
                  )}
                  {ProductInfo(t('stock') as string, String(data?.stock) || '')}
                  <Text style={styles.productDetail}>
                    {t('home.productDesc') as string}
                  </Text>
                  <HoldableText text={data?.description || ''} />
                </View>
                <Text style={[styles.productDetail, {marginLeft: 20}]}>
                  {t('home.productRelated') as string}
                </Text>
              </>
            )}
          </>
        )}
        columnWrapperStyle={{padding: 10}}
        contentContainerStyle={styles.containerList}
        numColumns={2}
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={refetch}
            colors={[theme.colors.primary]}
          />
        }
        renderItem={renderItem}
      />
      {data && (
        <View style={{padding: 20}}>
          <TouchableOpacity
            style={styles.btnAddToCart}
            activeOpacity={0.8}
            onPress={() => {
              dispatch(addCart(data as Product));
              Toast.show(t('home.successAddToCart'), Toast.SHORT);
            }}>
            <SvgXml
              xml={Icon.cartShoppingLinear(theme.colors.background)}
              width={24}
              height={24}
            />
            <Text style={styles.labelAddToCart}>{t('home.addToCart')}</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    screenContainer: {
      flex: 1,
    },
    centerContent: {
      flexGrow: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    image: {
      height: 400,
      backgroundColor: theme.colors.border,
    },
    price: {
      fontFamily: Fonts.semiBold,
      fontSize: 24,
      color: theme.colors.headerText,
    },
    discountPrice: {
      fontFamily: Fonts.regular,
      fontSize: 18,
      color: theme.colors.headerText,
      marginLeft: 5,
      textDecorationLine: 'line-through',
    },
    discountPercentage: {
      fontFamily: Fonts.semiBold,
      fontSize: 16,
      color: theme.colors.errorText,
      marginLeft: 5,
    },
    name: {
      fontFamily: Fonts.regular,
      fontSize: 16,
      color: theme.colors.headerText,
      marginTop: 15,
    },
    detailContainer: {
      padding: 20,
    },
    priceContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    productDetail: {
      fontFamily: Fonts.semiBold,
      fontSize: 16,
      color: theme.colors.headerText,
      marginTop: 15,
    },
    productInfoContainer: {
      paddingVertical: 8,
      borderBottomWidth: 1,
      borderColor: theme.colors.border,
      flexDirection: 'row',
      alignItems: 'center',
    },
    productInfoLabel: {
      fontFamily: Fonts.regular,
      fontSize: 14,
      color: theme.colors.placeHolder,
      width: 100,
    },
    productInfo: {
      fontFamily: Fonts.semiBold,
      fontSize: 14,
      color: theme.colors.headerText,
    },
    ratingContainer: {
      flexDirection: 'row',
      marginTop: 15,
      alignItems: 'center',
    },
    saved: {
      backgroundColor: theme.colors.background,
      position: 'absolute',
      right: 12,
      top: 12,
      padding: 8,
      borderRadius: 10,
    },
    containerList: {
      flexGrow: 1,
      paddingBottom: 100,
    },
    btnAddToCart: {
      borderRadius: 10,
      paddingVertical: 16,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.colors.primary,
      flexDirection: 'row',
    },
    labelAddToCart: {
      fontFamily: Fonts.bold,
      fontSize: 18,
      color: theme.colors.background,
      marginLeft: 15,
    },
  });

export default ProductDetail;
