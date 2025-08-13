import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Stack } from 'expo-router';
import CustomTabBar from './CustomTabBar';

export default function StackLayout() {
  return (
    <View style={styles.container}>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { paddingTop: 20, paddingBottom: 90 },
        }}
        style={{ flex: 1 }}
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
      <CustomTabBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
