import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import type { CouponStackParamList } from "../types/navigation";
import CouponListScreen from "../screens/Coupon/CouponListScreen";
import CouponDetailedScreen from "../screens/Coupon/CouponDetailedScreen";

const Stack = createNativeStackNavigator<CouponStackParamList>();

function CouponStack() {
  return (
    <Stack.Navigator initialRouteName="CouponListScreen">
      <Stack.Screen name = "CouponListScreen" component={CouponListScreen} options={{ headerShown: false }}/>
      <Stack.Screen name = "CouponDetailedScreen" component={CouponDetailedScreen} options={{ headerShown: false }}/>
    </Stack.Navigator>
  );
}

export default CouponStack;