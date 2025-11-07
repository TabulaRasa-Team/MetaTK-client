import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import type { RegisterStackParamList } from "../types/navigation";
import OcrScreen from "../screens/Register/OcrScreen";
import OcrCheckingScreen from "../screens/Register/OcrCheckingScreen";
import RegistMainInfoScreen from "../screens/Register/RegistMainInfoScreen";
import RegistPictureInfoScreen from "../screens/Register/RegistPictureInfoScreen";
import RegistSubInfoScreen from "../screens/Register/RegistSubInfoScreen";
import RegistCompleteScreen from "../screens/Register/RegistCompleteScreen";

const Stack = createNativeStackNavigator<RegisterStackParamList>();

function RegisterStack() {
  return (
    <Stack.Navigator initialRouteName="OcrScreen">
      <Stack.Screen name = "OcrScreen" component={OcrScreen} options={{ headerShown: false }}/>
      <Stack.Screen name = "OcrCheckingScreen" component={OcrCheckingScreen} options={{ headerShown: false }}/>
      <Stack.Screen name = "RegistMainInfoScreen" component={RegistMainInfoScreen} options={{ headerShown: false }}/>
      <Stack.Screen name = "RegistPictureInfoScreen" component={RegistPictureInfoScreen} options={{ headerShown: false }}/>
      <Stack.Screen name = "RegistSubInfoScreen" component={RegistSubInfoScreen} options={{ headerShown: false }}/>
      <Stack.Screen name = "RegistCompleteScreen" component={RegistCompleteScreen} options={{ headerShown: false }}/>
    </Stack.Navigator>
  );
}

export default RegisterStack;