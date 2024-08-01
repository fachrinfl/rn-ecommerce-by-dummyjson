import {createNavigationContainerRef} from '@react-navigation/native';
import {RootNavigatorParamList} from './navigation';

export const navigationRef =
  createNavigationContainerRef<RootNavigatorParamList>();
