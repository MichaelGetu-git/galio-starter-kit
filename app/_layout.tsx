import React from 'react';
import { Stack } from 'expo-router';
import theme from './theme';

// --- Main StackLayout without global header ---
export default function StackLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false, // Hide the global header
        contentStyle: {
          paddingTop: 20,  // adjust the value you want
        },
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="auth/Login" />
      <Stack.Screen name="auth/Register" />
      <Stack.Screen name="auth/Registerv2" />
      <Stack.Screen name="ui/Components" />
      <Stack.Screen name="ui/Cards" />
      <Stack.Screen name="ui/Grid" />
      <Stack.Screen name="ui/OrderConfirmed" />
      <Stack.Screen name="content/News" />
      <Stack.Screen name="content/Article" />
      <Stack.Screen name="content/ArticleCover" />
      <Stack.Screen name="content/ArticleFeedv1" />
      <Stack.Screen name="content/ArticleFeedv2" />
    </Stack>
  );
}
