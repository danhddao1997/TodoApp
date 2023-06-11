import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParamsList} from 'models/navigation';
import React, {useMemo} from 'react';
import {StackAnimationTypes} from 'react-native-screens';
import DetailScreen from 'screens/Detail';
import ListScreen from 'screens/List';
import {useRootSelector} from 'utils/hooks/redux';

const Stack = createNativeStackNavigator<RootStackParamsList>();

const AppNavigation = () => {
  const navigationType = useRootSelector(state => state.list.navigateType);

  const navigationAnimation = useMemo<StackAnimationTypes>(() => {
    switch (navigationType) {
      case 'create':
        return 'slide_from_bottom';
      case 'update':
        return 'fade';
      default:
        return 'default';
    }
  }, [navigationType]);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="List" component={ListScreen} />
        <Stack.Screen
          name="Detail"
          component={DetailScreen}
          options={{
            animation: navigationAnimation,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
