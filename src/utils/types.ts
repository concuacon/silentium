import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

export type RootStackParamList = {
  Home: undefined;
  Details: { postId: number };
};

type NewsListScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;
export type NewsListScreenRouteProp = RouteProp<RootStackParamList, 'Home'>;

export type NewsListScreenProps = {
    // route: NewsListScreenRouteProp;
    navigation: NewsListScreenNavigationProp;
  };

export type DetailScreenRouteProp = RouteProp<RootStackParamList, 'Details'>;
export type DetailScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Details'>;

export type DetailScreenProps = {
  route: DetailScreenRouteProp;
//   navigation: DetailScreenNavigationProp;
};
