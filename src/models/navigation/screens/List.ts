import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamsList} from '..';

export type ListScreenNavigationProp = NativeStackScreenProps<
  RootStackParamsList,
  'List'
>;
