import type { NavigatorScreenParams } from '@react-navigation/native';

export type RootStackParamList = {
  Home: NavigatorScreenParams<HomeStackParamList>;
  Register: NavigatorScreenParams<RegisterStackParamList>;
  Coupon: NavigatorScreenParams<CouponStackParamList>;
  Restaurant: NavigatorScreenParams<RestaurantStackParamList>;
};

export type RegisterStackParamList = {
  OcrScreen: undefined;
  OcrCheckingScreen: undefined;
  RegistMainInfoScreen: undefined;
  RegistPictureInfoScreen: undefined;
  RegistSubInfoScreen: undefined;
  RegistCompleteScreen: undefined;
};

export type HomeStackParamList = {
  MainScreen: undefined;
  CouponScanScreen: undefined;
  ScanCompleteScreen: undefined;
};

export type CouponStackParamList = {
  CouponListScreen: undefined;
  CouponDetailedScreen: {
    id: string;
    name: string;
    category: string;
    expires: string;
    address?: string;
    qrValue: string;
  };
};

export type RestaurantStackParamList = {
  RestaurantInfoScreen: {
    storeId?: string;
  };
  ChatBotScreen: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}