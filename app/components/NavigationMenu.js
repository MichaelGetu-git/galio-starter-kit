import React, { useEffect, useState } from 'react';
import {
  Modal, View, TouchableOpacity, StyleSheet, Dimensions, SafeAreaView, ScrollView, Animated
} from 'react-native';
import { router } from 'expo-router';
import { Icon, Text } from 'galio-framework';
import theme from '../theme';

const { width } = Dimensions.get('screen');

const NavigationMenu = ({ isVisible, onClose, currentScreen }) => {
  const [expandedSections, setExpandedSections] = useState({});
  const [slideAnim] = useState(new Animated.Value(-width)); // start offscreen LEFT

  // run animation whenever visibility changes
  useEffect(() => {
    if (isVisible) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: -width,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [isVisible]);

  const navigateToScreen = (screenName) => {
    onClose();
    if (screenName !== currentScreen) {
      router.push(screenName);
    }
  };

  const toggleSection = (sectionTitle) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionTitle]: !prev[sectionTitle]
    }));
  };

  const menuStructure = [
    { name: '/', title: 'Home', icon: 'home', family: 'material', type: 'single' },
    {
      title: 'Auth',
      icon: 'person',
      family: 'material',
      type: 'section',
      children: [
        { name: '/auth/Login', title: 'Login', icon: 'login', family: 'materialcommunity' },
        { name: '/auth/Register', title: 'Register', icon: 'person-add', family: 'material' },
        { name: '/auth/Registerv2', title: 'Register v2', icon: 'person', family: 'material' },
      ],
    },
    {
      title: 'UI',
      icon: 'apps',
      family: 'material',
      type: 'section',
      children: [
        { name: '/ui/Components', title: 'Components', icon: 'cube', family: 'fontawesome' },
        { name: '/ui/Cards', title: 'Cards', icon: 'album', family: 'materialcommunity' },
        { name: '/ui/Grid', title: 'Grid', icon: 'layers', family: 'materialcommunity' },
        { name: '/ui/OrderConfirmed', title: 'Order Confirmed', icon: 'check-circle', family: 'material' },
      ],
    },
    {
      title: 'Content',
      icon: 'slideshow',
      family: 'material',
      type: 'section',
      children: [
        { name: '/content/News', title: 'News', icon: 'newspaper', family: 'material' },
        { name: '/content/Article', title: 'Article', icon: 'receipt', family: 'material' },
        { name: '/content/Presentation', title: 'Presentation', icon: 'videocam', family: 'material' },
        { name: '/content/ArticleCover', title: 'Article Cover', icon: 'image', family: 'material' },
        { name: '/content/ArticleFeedv1', title: 'Article Feed v1', icon: 'list', family: 'ionicon' },
        { name: '/content/ArticleFeedv2', title: 'Article Feed v2', icon: 'book', family: 'fontawesome' },
      ],
    },
  ];

  const renderMenuItem = (item, index) => {
    if (item.type === 'single') {
      return (
        <TouchableOpacity
          key={index}
          style={[
            styles.menuItem,
            currentScreen === item.name && styles.activeMenuItem
          ]}
          onPress={() => navigateToScreen(item.name)}
        >
          <Icon
            name={item.icon}
            family={item.family}
            size={20}
            color={currentScreen === item.name ? theme.COLORS.WHITE : theme.COLORS.PRIMARY}
          />
          <Text style={[
            styles.menuText,
            currentScreen === item.name && styles.activeMenuText
          ]}>
            {item.title}
          </Text>
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
                name={item.icon}
                family={item.family}
                size={20}
                color={theme.COLORS.DARK}
              />
              <Text style={styles.sectionTitle}>{item.title}</Text>
            </View>
            <Icon
              name={isExpanded ? 'chevron-up' : 'chevron-down'}
              family="fontawesome5"
              size={16}
              color={theme.COLORS.MUTED}
            />
          </TouchableOpacity>

          {isExpanded && (
            <View style={styles.sectionChildren}>
              {item.children.map((child, childIndex) => (
                <TouchableOpacity
                  key={childIndex}
                  style={[
                    styles.childMenuItem,
                    currentScreen === child.name && styles.activeChildMenuItem
                  ]}
                  onPress={() => navigateToScreen(child.name)}
                >
                  <View style={styles.childIconContainer}>
                    <Icon
                      name={child.icon}
                      family={child.family}
                      size={16}
                      color={currentScreen === child.name ? theme.COLORS.WHITE : theme.COLORS.PRIMARY}
                    />
                  </View>
                  <Text style={[
                    styles.childMenuText,
                    currentScreen === child.name && styles.activeChildMenuText
                  ]}>
                    {child.title}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
      );
    }
  };

  return (
    <Modal
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        {/* Dark background that closes the menu when tapped */}
        <TouchableOpacity
          style={styles.modalBackground}
          activeOpacity={1}
          onPress={onClose}
        />

        {/* Animate the menu sliding in from LEFT */}
        <Animated.View
          style={[
            styles.menuContainer,
            { transform: [{ translateX: slideAnim }] }
          ]}
        >
          <SafeAreaView style={styles.menuContent}>
            <View style={styles.menuHeader}>
              <Text style={styles.menuTitle}>Navigation</Text>
              <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                <Icon
                  name="close"
                  family="fontisto"
                  size={24}
                  color={theme.COLORS.MUTED}
                />
              </TouchableOpacity>
            </View>

            <ScrollView
              style={styles.menuScrollView}
              showsVerticalScrollIndicator={false}
            >
              {menuStructure.map((item, index) => renderMenuItem(item, index))}
            </ScrollView>
          </SafeAreaView>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    flexDirection: 'row', // menu sits LEFT, background fills the rest
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  menuContainer: {
    width: width * 0.8,
    maxWidth: 320,
    backgroundColor: theme.COLORS.WHITE,
    shadowColor: '#000',
    shadowOffset: { width: -2, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
  },
  menuContent: { flex: 1 },
  menuHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.SIZES.BASE,
    borderBottomWidth: 1,
    borderBottomColor: theme.COLORS.MUTED,
    backgroundColor: theme.COLORS.WHITE,
  },
  menuTitle: {
    fontSize: theme.SIZES.FONT * 1.25,
    fontWeight: 'bold',
    color: theme.COLORS.BLACK,
  },
  closeButton: { padding: 5 },
  menuScrollView: { flex: 1 },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: theme.SIZES.BASE * 0.75,
    paddingHorizontal: theme.SIZES.BASE,
    borderBottomWidth: 1,
    borderBottomColor: '#f8f8f8',
  },
  activeMenuItem: { backgroundColor: theme.COLORS.PRIMARY },
  menuText: {
    marginLeft: theme.SIZES.BASE,
    fontSize: theme.SIZES.FONT,
    color: theme.COLORS.BLACK,
    fontWeight: '500',
  },
  activeMenuText: { color: theme.COLORS.WHITE, fontWeight: 'bold' },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: theme.SIZES.BASE,
    paddingHorizontal: theme.SIZES.BASE,
    backgroundColor: '#f8f9fa',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  sectionHeaderContent: { flexDirection: 'row', alignItems: 'center' },
  sectionTitle: {
    marginLeft: theme.SIZES.BASE,
    fontSize: theme.SIZES.FONT * 1.1,
    color: theme.COLORS.BLACK,
    fontWeight: '600',
  },
  sectionChildren: { backgroundColor: '#fdfdfd' },
  childMenuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: theme.SIZES.BASE * 0.6,
    paddingHorizontal: theme.SIZES.BASE,
    paddingLeft: theme.SIZES.BASE * 2.5,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  activeChildMenuItem: { backgroundColor: theme.COLORS.PRIMARY },
  childIconContainer: { width: 20, alignItems: 'center' },
  childMenuText: {
    marginLeft: theme.SIZES.BASE * 0.75,
    fontSize: theme.SIZES.FONT * 0.9,
    color: theme.COLORS.BLACK,
    fontWeight: '400',
  },
  activeChildMenuText: { color: theme.COLORS.WHITE, fontWeight: 'bold' },
});

export default NavigationMenu;
