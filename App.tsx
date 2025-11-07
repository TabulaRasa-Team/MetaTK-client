import React, { useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import RootNavigation from './src/navigation';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useFonts } from 'expo-font';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 5 * 60 * 1000,
    },
  },
});

export default function App() {
  const [loaded] = useFonts({
    'Pretendard-Black': require('./src/assets/fonts/Pretendard-Black.otf'),
    'Pretendard-Bold': require('./src/assets/fonts/Pretendard-Bold.otf'),
    'Pretendard-ExtraBold': require('./src/assets/fonts/Pretendard-ExtraBold.otf'),
    'Pretendard-ExtraLight': require('./src/assets/fonts/Pretendard-ExtraLight.otf'),
    'Pretendard-Light': require('./src/assets/fonts/Pretendard-Light.otf'),
    'Pretendard-Medium': require('./src/assets/fonts/Pretendard-Medium.otf'),
    'Pretendard-Regular': require('./src/assets/fonts/Pretendard-Regular.otf'),
    'Pretendard-SemiBold': require('./src/assets/fonts/Pretendard-SemiBold.otf'),
    'Pretendard-Thin': require('./src/assets/fonts/Pretendard-Thin.otf'),
  });

  if (!loaded) return null;

  return (
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <RootNavigation />
      </GestureHandlerRootView>
    </QueryClientProvider>
  );
}
