// src/navigation/RootNavigation.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createNavigationContainerRef } from '@react-navigation/native';
import { RootStackParamList } from '../types/navigation';

import HomeStack from './HomeStack';
import RegisterStack from './RegisterStack';
import CouponStack from './CouponStack';
import RestaurantStack from './RestaurantStack';


export const navigationRef = createNavigationContainerRef<RootStackParamList>();
export function navigate<Screen extends keyof RootStackParamList>(
  screen: Screen
): void;
export function navigate<Screen extends keyof RootStackParamList>(
  screen: Screen,
  params: RootStackParamList[Screen]
): void;
export function navigate(screen: any, params?: any) {
  if (navigationRef.isReady()) {
    if (params === undefined) {
      navigationRef.navigate(screen);
    } else {
      navigationRef.navigate(screen, params);
    }
  }
}

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigation() {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeStack} options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={RegisterStack} options={{ headerShown: false }} />
        <Stack.Screen name="Coupon" component={CouponStack} options={{ headerShown: false }} />
        <Stack.Screen name="Restaurant" component={RestaurantStack} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
