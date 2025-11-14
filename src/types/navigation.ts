import type { NavigatorScreenParams } from '@react-navigation/native';

export type RootStackParamList = {
  Home: NavigatorScreenParams<HomeStackParamList>;
  Register: NavigatorScreenParams<RegisterStackParamList>;
  Coupon: NavigatorScreenParams<CouponStackParamList>;
  Restaurant: NavigatorScreenParams<RestaurantStackParamList>;
};

export type RegisterStackParamList = {
  OcrScreen: undefined;
  OcrCheckingScreen: {
    companyName: string;
    businessNumber: string;
    representativeName: string;
    openingDate: string;
  };
  RegistMainInfoScreen: {
    businessNumber?: string;
    representativeName?: string;
    openingDate?: string;
  };
  RegistPictureInfoScreen: {
    businessNumber?: string;
    representativeName?: string;
    openingDate?: string;
    address: string;
    phone: string;
    weeklyHours: { [key: string]: { start: string; end: string } };
  };
  RegistCompleteScreen: {
    storeId: string;
  };
  RegistSubInfoScreen: {
    storeId: string;
  };
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
  ChatBotScreen: {
    storeId?: string;
  };
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}