import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import type { RestaurantStackParamList } from "../types/navigation";
import RestaurantInfoScreen from "../screens/Restaurant/RestaurantInfoScreen";
import ChatBotScreen from "../screens/Restaurant/ChatBotScreen";

const Stack = createNativeStackNavigator<RestaurantStackParamList>();

function RestaurantStack() {
  return (
    <Stack.Navigator initialRouteName="RestaurantInfoScreen">
      <Stack.Screen name = "RestaurantInfoScreen" component={RestaurantInfoScreen} options={{ headerShown: false }}/>
      <Stack.Screen name = "ChatBotScreen" component={ChatBotScreen} options={{ headerShown: false }}/>
    </Stack.Navigator>
  );
}

export default RestaurantStack;