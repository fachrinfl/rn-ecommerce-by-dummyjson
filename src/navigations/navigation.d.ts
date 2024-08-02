import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RouteProp} from '@react-navigation/native';

export type RootNavigatorParamList = {
  Main: NavigatorScreenParams<MainBottomTabNavigatorParamList> | undefined;
  ProductDetail: {
    productId: string;
  };
};

export type MainBottomTabNavigatorParamList = {
  HomeTab: undefined;
  SearchTab: undefined;
  SavedTab: undefined;
  CartTab: undefined;
  AccountTab: undefined;
};

export type ProductNavigationProp = NativeStackNavigationProp<
  RootNavigatorParamList,
  'Product'
>;

export type ProductDetailRouteProp = RouteProp<
  RootNavigatorParamList,
  'ProductDetail'
>;
