import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Stack } from 'expo-router';
import CustomTabBar from './components/CustomTabBar';
import { GalioProvider } from 'galio-framework';
import theme from './theme';

export default function StackLayout() {
  return (
    <GalioProvider theme={theme}>
      <View style={styles.container}>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { paddingTop: 20, paddingBottom: 90 },
        }}
        style={{ flex: 1 }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="screens/auth/Login" />
        <Stack.Screen name="screens/auth/Register" />
        <Stack.Screen name="screens/auth/Registerv2" />
        <Stack.Screen name="screens/ui/Components" />
        <Stack.Screen name="screens/ui/Cards" />
        <Stack.Screen name="screens/ui/Grid" />
        <Stack.Screen name="screens/ui/OrderConfirmed" />
        <Stack.Screen name="screens/content/News" />
        <Stack.Screen name="screens/content/Article" />
        <Stack.Screen name="screens/content/ArticleCover" />
        <Stack.Screen name="screens/content/ArticleFeedv1" />
        <Stack.Screen name="screens/content/ArticleFeedv2" />
      </Stack>
      <CustomTabBar />
    </View>
    </GalioProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
