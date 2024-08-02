/* eslint-disable react-hooks/exhaustive-deps */
import React, {useCallback} from 'react';
import {View, StyleSheet, FlatList, Text} from 'react-native';
import {useSelector} from 'react-redux';
import {RootState} from '../../../redux/store';
import {ProductItem} from '../../../components';
import {Product} from '../../../api/types/product';
import {SvgXml} from 'react-native-svg';
import {useTheme} from '@react-navigation/native';
import {Theme} from '../../../constants/types/theme';
import {Fonts, Icon} from '../../../constants';
import {useTranslation} from 'react-i18next';

const SavedTabScreen: React.FC = () => {
  const theme = useTheme() as unknown as Theme;
  const styles = createStyles(theme);
  const saved = useSelector((state: RootState) => state.saved);
  const {t} = useTranslation();

  const renderItem = useCallback(
    ({item}: {item: Product}) => <ProductItem item={item} isShowCategory />,
    [],
  );

  const renderEmpty = useCallback(
    () => (
      <View style={styles.emptyContainer}>
        <SvgXml
          xml={Icon.heartSolid(theme.colors.placeHolder)}
          width={64}
          height={64}
        />
        <Text style={styles.title}>{t('saved.emptyMessage')}</Text>
        <Text style={styles.desc}>{t('saved.description')}</Text>
      </View>
    ),
    [],
  );

  const keyExtractor = useCallback((item: Product) => item.id.toString(), []);

  return (
    <View style={styles.container}>
      <FlatList
        data={saved || []}
        keyExtractor={keyExtractor}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.containerList}
        numColumns={2}
        renderItem={renderItem}
        ListEmptyComponent={renderEmpty}
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
      padding: 10,
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
  });

export default SavedTabScreen;
