import React, { useState } from 'react';
import {
  View, ScrollView, StyleSheet,
} from 'react-native';

// Galio components
import { Card, NavBar, Button } from 'galio-framework';
import NavigationMenu from '../../components/NavigationMenu';

const ArticleFull = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(prev => !prev);

  return (
    <View style={styles.container}>
      <NavBar
        transparent
        title="Article Feed v1"
        left={(
          <Button
            onlyIcon
            icon="menu"
            iconFamily="ionicon"
            iconSize={20}
            iconColor="#000"
            color="transparent"
            onPress={toggleMenu}
          />
        )}
        onLeftPress={toggleMenu}
      />

      <NavigationMenu
        isVisible={isMenuOpen}
        onClose={toggleMenu}
        currentScreen="/articlefull" // example current screen path
      />

      <ScrollView style={{ flex: 1 }}>
        <View style={styles.cardsWrapper}>
          <Card
            neutral
            fullBackgroundImage
            image="https://images.unsplash.com/photo-1536523552737-74ded3c0591c?ixlib=rb-0.3.5&auto=format&fit=crop&w=1351&q=80"
            authorImageSrc="http://i.pravatar.cc/100"
            authorTitle="Alin Gheorghe"
            authorSubTitle="420 minutes ago"
          />
          <Card
            neutral
            fullBackgroundImage
            image="https://images.unsplash.com/photo-1536396123481-991b5b636cbb?ixlib=rb-0.3.5&auto=format&fit=crop&w=1331&q=80"
            authorImageSrc="http://i.pravatar.cc/100"
            authorTitle="A$AP Rocky"
            authorSubTitle="420 minutes ago"
          />
          <Card
            neutral
            fullBackgroundImage
            image="https://images.unsplash.com/photo-1536567929406-c818f28ec428?ixlib=rb-0.3.5&auto=format&fit=crop&w=1350&q=80"
            authorImageSrc="http://i.pravatar.cc/100"
            authorTitle="Vini Vici"
            authorSubTitle="420 minutes ago"
          />
          <Card
            neutral
            fullBackgroundImage
            image="https://images.unsplash.com/photo-1536567893079-f54abdc73dc2?ixlib=rb-0.3.5&auto=format&fit=crop&w=1350&q=80"
            authorImageSrc="http://i.pravatar.cc/100"
            authorTitle="Offset"
            authorSubTitle="420 minutes ago"
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  cardsWrapper: {
    padding: 18,
    justifyContent: 'flex-start',
  },
});

export default ArticleFull;
