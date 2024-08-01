/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  RefreshControl,
} from 'react-native';
import {Theme} from '../../../constants/types/theme';
import {useNavigation, useTheme} from '@react-navigation/native';
import {useProductsByCategory} from '../../../api/hooks/useProducts';
import {configs} from '../../../constants/configs';
import {ProductItem} from '../../../components';
import {ProductNavigationProp} from '../../../navigations/navigation';
import {Product} from '../../../api/types/product';

interface Props {
  category?: string | undefined;
}

const ProductScreen: React.FC<Props> = ({category}) => {
  const theme = useTheme() as unknown as Theme;
  const navigation = useNavigation<ProductNavigationProp>();
  const [isActive, setIsActive] = useState<boolean>(false);
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetchingNextPage,
    refetch,
  } = useProductsByCategory(category, isActive, {
    limit: configs.limitPage,
  });

  useEffect(() => {
    const unsubscribe = navigation.addListener('state', e => {
      const index = e.data.state.index;
      const routeName = e.data.state.routes[index].name;
      setIsActive(routeName === category);
    });

    return unsubscribe;
  }, [navigation, category]);

  if (!category) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  const renderItem = useCallback(
    ({item}: {item: Product}) => <ProductItem item={item} />,
    [],
  );

  const keyExtractor = useCallback((item: Product) => item.id.toString(), []);

  const footerLoading = useCallback(() => {
    if (isFetchingNextPage) {
      return (
        <ActivityIndicator
          size="large"
          color={theme.colors.primary}
          style={styles.footerLoading}
        />
      );
    }
    return null;
  }, [isFetchingNextPage]);

  return (
    <View style={styles.container}>
      <FlatList
        data={data?.pages || []}
        keyExtractor={keyExtractor}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        showsVerticalScrollIndicator={false}
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
        onEndReached={() => {
          if (hasNextPage) {
            fetchNextPage();
          }
        }}
        onEndReachedThreshold={0.3}
        ListFooterComponent={footerLoading}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
  },
  containerList: {
    flexGrow: 1,
    padding: 10,
    paddingBottom: 100,
  },
  footerLoading: {
    alignSelf: 'center',
    margin: 20,
  },
});

export default ProductScreen;
