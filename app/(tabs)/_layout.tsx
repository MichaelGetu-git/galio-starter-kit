import { Stack } from 'expo-router';
import React, { useState } from 'react';
import { View, TouchableOpacity, Modal, StyleSheet, Text, SafeAreaView, ScrollView } from 'react-native';
import { router } from 'expo-router';

import { Icon } from 'galio-framework';
import theme from '../theme';

const menuStructure = [
{ name: '', title: 'Home', icon: 'home-outline', family: 'ionicon', type: 'single' },
  {
    title: 'Auth',
    icon: 'person-outline',
    family: 'ionicon',
    type: 'section',
    children: [
      { name: 'auth/login', title: 'Login', icon: 'log-in-outline', family: 'ionicon' },
      { name: 'auth/register', title: 'Register', icon: 'person-add-outline', family: 'ionicon' },
      { name: 'auth/registerv2', title: 'Register v2', icon: 'person-add', family: 'ionicon' },
    ]
  },
  {
    title: 'UI',
    icon: 'options-outline',
    family: 'ionicon',
    type: 'section',
    children: [
      { name: 'ui/components', title: 'Components', icon: 'cube-outline', family: 'ionicon' },
      { name: 'ui/cards', title: 'Cards', icon: 'card-outline', family: 'ionicon' },
      { name: 'ui/grid', title: 'Grid', icon: 'grid-outline', family: 'ionicon' },
      { name: 'ui/orderconfirmed', title: 'OrderConfirmed', icon: 'order-outline', family: 'ionicon'},
    ]
  },
  {
    title: 'Content',
    icon: 'document-text-outline',
    family: 'ionicon',
    type: 'section',
    children: [
      { name: 'content/news', title: 'News', icon: 'newspaper-outline', family: 'ionicon' },
      { name: 'content/article', title: 'Article', icon: 'document-outline', family: 'ionicon' },
      { name: 'content/presentation', title: 'Presentation', icon: 'present', family: 'ionicon' },
      { name: 'content/articlecover', title: 'Article Cover', icon: 'image-outline', family: 'ionicon' },
      { name: 'content/articlefeedv1', title: 'Article Feed v1', icon: 'list-outline', family: 'ionicon' },
      { name: 'content/articlefeedv2', title: 'Article Feed v2', icon: 'list', family: 'ionicon' },
    ]
  },
];

function BurgerMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState({});

  const toggleSection = (sectionTitle) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionTitle]: !prev[sectionTitle]
    }));
  };

  const navigateToScreen = (screenName) => {
    setIsMenuOpen(false);
    router.push(`/${screenName}`);
  };

  const renderMenuItem = (item, index) => {
    if (item.type === 'single') {
      return (
        <TouchableOpacity
          key={index}
          style={styles.menuItem}
          onPress={() => navigateToScreen(item.name)}
        >
          <View style={styles.menuItemContent}>
            <Icon 
              size={22} 
              name={item.icon} 
              family={item.family} 
              color={theme.COLORS.PRIMARY || '#5E72E4'} 
            />
            <Text style={styles.menuItemText}>{item.title}</Text>
          </View>
        </TouchableOpacity>
      );
    }

    if (item.type === 'section') {
      const isExpanded = expandedSections[item.title];
      
      return (
        <View key={index}>
          <TouchableOpacity
            style={styles.sectionHeader}
            onPress={() => toggleSection(item.title)}
          >
            <View style={styles.sectionHeaderContent}>
              <Icon 
                size={22} 
                name={item.icon} 
                family={item.family} 
                color={theme.COLORS.DARK || '#333'} 
              />
              <Text style={styles.sectionTitle}>{item.title}</Text>
            </View>
            <Icon 
              size={18} 
              name={isExpanded ? 'chevron-up' : 'chevron-down'} 
              family="ionicon" 
              color={theme.COLORS.MUTED || '#8898AA'} 
            />
          </TouchableOpacity>
          
          {isExpanded && (
            <View style={styles.sectionChildren}>
              {item.children.map((child, childIndex) => (
                <TouchableOpacity
                  key={childIndex}
                  style={styles.childMenuItem}
                  onPress={() => navigateToScreen(child.name)}
                >
                  <View style={styles.childMenuItemContent}>
                    <View style={styles.childIconContainer}>
                      <Icon 
                        size={18} 
                        name={child.icon} 
                        family={child.family} 
                        color={theme.COLORS.PRIMARY || '#5E72E4'} 
                      />
                    </View>
                    <Text style={styles.childMenuItemText}>{child.title}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
      );
    }
  };

  return (
    <>
      <TouchableOpacity 
        onPress={() => setIsMenuOpen(true)}
        style={styles.burgerButton}
      >
        <Icon 
          size={24} 
          name="menu" 
          family="ionicon" 
          color={theme.COLORS.WHITE || '#ffffff'} 
        />
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isMenuOpen}
        onRequestClose={() => setIsMenuOpen(false)}
      >
        <View style={styles.modalOverlay}>
          <TouchableOpacity 
            style={styles.modalBackground}
            onPress={() => setIsMenuOpen(false)}
          />
          
          <View style={styles.menuContainer}>
            <SafeAreaView style={styles.menuContent}>
              <View style={styles.menuHeader}>
                <Text style={styles.menuTitle}>Navigation</Text>
                <TouchableOpacity 
                  onPress={() => setIsMenuOpen(false)}
                  style={styles.closeButton}
                >
                  <Icon 
                    size={24} 
                    name="close" 
                    family="ionicon" 
                    color={theme.COLORS.MUTED || '#8898AA'} 
                  />
                </TouchableOpacity>
              </View>

              <ScrollView style={styles.menuScrollView} showsVerticalScrollIndicator={false}>
                {menuStructure.map((item, index) => renderMenuItem(item, index))}
              </ScrollView>
            </SafeAreaView>
          </View>
        </View>
      </Modal>
    </>
  );
}

export default function StackLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.COLORS.PRIMARY || '#5E72E4',
        },
        headerTintColor: theme.COLORS.WHITE || '#ffffff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerLeft: () => <BurgerMenu />,
      }}
    >
      <Stack.Screen name="index" options={{ title: 'Home' }} />
      
      {/* Auth Screens */}
      <Stack.Screen name="auth/login" options={{ title: 'Login' }} />
      <Stack.Screen name="auth/register" options={{ title: 'Register' }} />
      <Stack.Screen name="auth/registerv2" options={{ title: 'Register v2' }} />
      
      {/* UI Screens */}
      <Stack.Screen name="ui/components" options={{ title: 'Components' }} />
      <Stack.Screen name="ui/cards" options={{ title: 'Cards' }} />
      <Stack.Screen name="ui/grid" options={{ title: 'Grid' }} />
      
      {/* Content Screens */}
      <Stack.Screen name="content/news" options={{ title: 'News' }} />
      <Stack.Screen name="content/article" options={{ title: 'Article' }} />
      <Stack.Screen name="content/articlecover" options={{ title: 'Article Cover' }} />
      <Stack.Screen name="content/articlefeedv1" options={{ title: 'Article Feed v1' }} />
      <Stack.Screen name="content/articlefeedv2" options={{ title: 'Article Feed v2' }} />
    </Stack>
  );
}

const styles = StyleSheet.create({
  burgerButton: {
    paddingLeft: 15,
    paddingRight: 10,
  },
  modalOverlay: {
    flex: 1,
    flexDirection: 'row',
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  menuContainer: {
    width: 300,
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  menuContent: {
    flex: 1,
  },
  menuHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  menuTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  closeButton: {
    padding: 5,
  },
  menuScrollView: {
    flex: 1,
  },
  menuItem: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f8f8f8',
  },
  menuItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemText: {
    marginLeft: 15,
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: '#f8f9fa',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  sectionHeaderContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionTitle: {
    marginLeft: 15,
    fontSize: 16,
    color: '#333',
    fontWeight: '600',
  },
  sectionChildren: {
    backgroundColor: '#fdfdfd',
  },
  childMenuItem: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    paddingLeft: 40,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  childMenuItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  childIconContainer: {
    width: 24,
    alignItems: 'center',
  },
  childMenuItemText: {
    marginLeft: 12,
    fontSize: 14,
    color: '#555',
    fontWeight: '400',
  },
});