import React, { useState } from 'react';
import {
  ScrollView, StyleSheet, Image,
} from 'react-native';

// Galio components
import {
  Block, Card, Text, NavBar, Button,
} from 'galio-framework';
import theme from '../../theme';
import NavigationMenu from '../../components/NavigationMenu';

const ArticleHalf = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(prev => !prev);

  return (
    <Block flex>
      <NavBar
        transparent
        title="Article Feed v2"
        left={(
          <Button
            onlyIcon
            icon="menu"
            iconFamily="ionicon"
            iconSize={theme.SIZES.BASE}
            iconColor={theme.COLORS.ICON}
            color="transparent"
            onPress={toggleMenu}
          />
        )}
        onLeftPress={toggleMenu}
      />

      <NavigationMenu
        isVisible={isMenuOpen}
        onClose={toggleMenu}
        currentScreen="/articlehalf"
      />

      <ScrollView style={{ flex: 1 }}>
        <Block flex style={styles.container}>
          <Card
            image="https://images.unsplash.com/photo-1536523552737-74ded3c0591c?ixlib=rb-0.3.5&auto=format&fit=crop&w=1351&q=80"
            authorImageSrc="http://i.pravatar.cc/100"
            authorTitle="Alin Gheorghe"
            authorSubTitle="420 minutes ago"
            rightSideComponent={(
              <Block row middle style={{ flexShrink: 1 }}>
                <Image
                  source={{ uri: 'https://cdn.iconscout.com/icon/premium/png-256-thumb/location-pin-127-595049.png' }}
                  style={{ width: 15, height: 15, marginRight: 4 }}
                />
                <Text p muted numberOfLines={1} style={{ flexShrink: 1 }}>
                  Los Angeles, CA
                </Text>
              </Block>
            )}
          />

          <Card
            image="https://images.unsplash.com/photo-1536396123481-991b5b636cbb?ixlib=rb-0.3.5&auto=format&fit=crop&w=1331&q=80"
            authorImageSrc="http://i.pravatar.cc/100"
            authorTitle="Einstein aka Young Physics"
            authorSubTitle="420 minutes ago"
          />

          <Card
            image="https://images.unsplash.com/photo-1536567929406-c818f28ec428?ixlib=rb-0.3.5&auto=format&fit=crop&w=1350&q=80"
            authorImageSrc="http://i.pravatar.cc/100"
            authorTitle="Lil' Pump"
            authorSubTitle="420 minutes ago"
            rightSideComponent={(
              <Block row middle style={{ flexShrink: 1 }}>
                <Image
                  source={{ uri: 'https://cdn.iconscout.com/icon/premium/png-256-thumb/location-pin-127-595049.png' }}
                  style={{ width: 15, height: 15, marginRight: 4 }}
                />
                <Text p muted numberOfLines={1} style={{ flexShrink: 1 }}>
                  Los Angeles, CA
                </Text>
              </Block>
            )}
          />

          <Card
            image="https://images.unsplash.com/photo-1536567893079-f54abdc73dc2?ixlib=rb-0.3.5&auto=format&fit=crop&w=1350&q=80"
            authorImageSrc="http://i.pravatar.cc/100"
            authorTitle="Kanye West"
            authorSubTitle="420 minutes ago"
          />
        </Block>
      </ScrollView>
    </Block>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 18,
    backgroundColor: theme.COLORS.WHITE,
    justifyContent: 'flex-start',
  },
});

export default ArticleHalf;
