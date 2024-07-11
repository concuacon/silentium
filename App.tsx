import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import NewsList from './src/screens/NewsList';
import PostDetail from './src/screens/PostDetail';
import {RootStackParamList} from './src/utils/types';

const Stack = createNativeStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  return (
    <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Home" component={NewsList} options={{title: 'News', headerTitleAlign: 'center'}}  />
      <Stack.Screen name="Details" component={PostDetail} options={{title: 'Post Detail '}} />
    </Stack.Navigator>
  </NavigationContainer>
  );
};

export default App;
