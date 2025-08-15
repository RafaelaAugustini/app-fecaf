import { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { DefaultTheme, ThemeProvider } from '@react-navigation/native';

import { store } from './store';

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) return null;

  return (
    <Provider store={store}>
      <SafeAreaView
        style={styles.container}
        edges={['top']}
        pointerEvents='box-none'
      >
        <ThemeProvider value={DefaultTheme}>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name='index' />
            <Stack.Screen name='first.page' />
            <Stack.Screen
              name='product'
              options={{
                headerShown: true,
                headerTitle: '',
                headerBackButtonDisplayMode: 'minimal',
              }}
            />
          </Stack>
          <StatusBar translucent backgroundColor='transparent' style='auto' />
        </ThemeProvider>
      </SafeAreaView>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
