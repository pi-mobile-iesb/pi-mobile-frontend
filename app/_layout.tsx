import { Stack, router, usePathname } from 'expo-router';
import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function RootLayout() {
  const pathname = usePathname();

  useEffect(() => {
    async function checkLogin() {
      const user = await AsyncStorage.getItem('user');
      if (!user && pathname !== '/login' && pathname !== '/cadastro') {
        router.replace('/login');
      }
    }
    checkLogin();
  }, [pathname]);

  return <Stack screenOptions={{ headerShown: false }} />;
}

