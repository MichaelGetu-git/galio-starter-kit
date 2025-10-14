import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter, usePathname } from 'expo-router';
import { Icon } from 'galio-framework';
import theme from '../theme';

const CustomTabBar = () => {
  const router = useRouter();
  const pathname = usePathname(); // current path to determine focused tab

  // Define your tabs here same as before
  const tabs = [
    {
      name: 'index',
      label: 'Home',
      icon: 'home',
    },
    {
      name: 'screens/auth/Login',
      label: 'Auth',
      icon: 'user-secret',
    },
    {
      name: 'screens/content/Article',
      label: 'Content',
      icon: 'archive',
    },
    {
      name: 'screens/ui/Components',
      label: 'UI',
      icon: 'sliders',
    },
  ];

  return (
    <View style={styles.tabBar}>
      {tabs.map(({ name, label, icon }) => {
        const isFocused = pathname === `/${name === 'index' ? '' : name}`;

        const color = isFocused ? theme.COLORS.PRIMARY : theme.COLORS.ICON;

        return (
          <TouchableOpacity
            key={name}
            onPress={() => router.push(name === 'index' ? '/' : `/${name}`)}
            style={styles.tabItem}
          >
            <Icon size={28} name={icon} family="fontawesome" color={color} />
            <Text style={[styles.label, { color }]}>{label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    bottom: 3,
    left: 16,
    right: 16,
    borderRadius: 25,
    height: 80,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: 'white',
    elevation: 5,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  tabItem: {
    alignItems: 'center',
  },
  label: {
    fontSize: 12,
    marginTop: 4,
    textAlign: 'center',
  },
});

export default CustomTabBar;
