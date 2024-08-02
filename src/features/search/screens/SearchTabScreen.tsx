/* eslint-disable react-hooks/exhaustive-deps */
import React, {useCallback, useState} from 'react';
import {useTheme} from '@react-navigation/native';
import {
  View,
  StyleSheet,
  TextInput,
  ActivityIndicator,
  FlatList,
  RefreshControl,
} from 'react-native';
import {Theme} from '../../../constants/types/theme';
import {useTranslation} from 'react-i18next';
import {useProductsSearch} from '../../../api/hooks/useProducts';
import {configs} from '../../../constants/configs';
import {Product} from '../../../api/types/product';
import {ProductItem} from '../../../components';

const SearchTabScreen: React.FC = () => {
  const [search, setSearch] = useState<string>('');
  const theme = useTheme() as unknown as Theme;
  const styles = createStyles(theme);
  const {t} = useTranslation();
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetchingNextPage,
    refetch,
  } = useProductsSearch({
    limit: configs.limitPage,
    q: search,
  });

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
      <View style={styles.containerSearch}>
        <TextInput
          value={search}
          onChangeText={setSearch}
          style={styles.inputSearch}
          placeholderTextColor={theme.colors.placeHolder}
          placeholder={t('search.searchPlaceHolder')}
        />
      </View>
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
        onEndReached={() => hasNextPage && fetchNextPage()}
        onEndReachedThreshold={0.3}
        ListFooterComponent={footerLoading}
      />
    </View>
  );
};

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    containerSearch: {
      backgroundColor: theme.colors.background,
      paddingBottom: 16,
    },
    inputSearch: {
      backgroundColor: theme.colors.border,
      marginHorizontal: 16,
      borderRadius: 10,
      paddingHorizontal: 16,
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
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

export default SearchTabScreen;
