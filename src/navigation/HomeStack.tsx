import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import type { HomeStackParamList } from "../types/navigation";
import MainScreen from "../screens/Home/MainScreen";
import CouponScanScreen from "../screens/Home/CouponScanScreen";
import ScanCompleteScreen from "../screens/Home/ScanCompleteScreen";

const Stack = createNativeStackNavigator<HomeStackParamList>();

function HomeStack() {
  return (
    <Stack.Navigator initialRouteName="MainScreen">
      <Stack.Screen name = "MainScreen" component={MainScreen} options={{ headerShown: false }}/>
      <Stack.Screen name = "CouponScanScreen" component={CouponScanScreen} options={{ headerShown: false }}/>
      <Stack.Screen name = "ScanCompleteScreen" component={ScanCompleteScreen} options={{ headerShown: false }}/>
    </Stack.Navigator>
  );
}

export default HomeStack;