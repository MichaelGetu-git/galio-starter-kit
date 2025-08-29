import React, { useState } from 'react';
import {
  Image,
  StatusBar,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import Constants from 'expo-constants';

// galio components
import {
  Block, Card, Text, Icon, NavBar,
  Button,
} from 'galio-framework';
import theme from '../theme';
import NavigationMenu from '../components/NavigationMenu';

const { width, height } = Dimensions.get('screen');
const statusBarHeight = Constants.statusBarHeight;

const bgImage = 'https://images.unsplash.com/photo-1516651029879-bcd191e7d33b?fit=crop&w=900&q=80';

const Article = () => {

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(prev => !prev);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.COLORS.WHITE }}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

      <Block style={styles.navbar}>
        <NavBar
          transparent
          left={(
            <Button
              onlyIcon
              icon="menu"
              iconFamily="ionicon"
              iconSize={theme.SIZES.BASE}
              iconColor={theme.COLORS.WHITE}
              color="transparent"
              onPress={toggleMenu}
            />
          )}
        />
        <NavigationMenu
          isVisible={isMenuOpen}
          onClose={toggleMenu}
          currentScreen="/content/Article"
        />
      </Block>

      <ScrollView contentContainerStyle={{ paddingBottom: theme.SIZES.BASE * 2 }}>
        <Image
          source={{ uri: bgImage }}
          resizeMode="cover"
          style={{
            width,
            height: height * 0.55,
          }}
        />

        <Block center style={{ marginTop: -theme.SIZES.BASE * 2 }}>
          <Block style={styles.header}>
            <Block>
              <Text size={theme.SIZES.BASE * 1.875}>I would happily watch a TV show about crabs</Text>
              <Text
                muted
                size={theme.SIZES.BASE * 0.875}
                style={{ marginTop: theme.SIZES.BASE, fontWeight: '500' }}
              >
                InterBlocking this super star
              </Text>
            </Block>

            <Card
              flex
              borderless
              shadowColor={theme.COLORS.BLACK}
              style={styles.author}
              title="Christopher Moon"
              caption="139 minutes ago"
              avatar="http://i.pravatar.cc/100?id=article"
              location={(
                <Block row right>
                  <Block row middle style={{ marginHorizontal: theme.SIZES.BASE }}>
                    <Icon name="eye" family="fontisto" color={theme.COLORS.MUTED} size={theme.SIZES.FONT * 0.875} />
                    <Text
                      p
                      color={theme.COLORS.MUTED}
                      size={theme.SIZES.FONT * 0.875}
                      style={{ marginLeft: theme.SIZES.BASE * 0.25 }}
                    >
                      25.6k
                    </Text>
                  </Block>
                  <Block row middle>
                    <Icon name="heart" family="fontisto" color={theme.COLORS.MUTED} size={theme.SIZES.FONT * 0.875} />
                    <Text
                      p
                      color={theme.COLORS.MUTED}
                      size={theme.SIZES.FONT * 0.875}
                      style={{ marginLeft: theme.SIZES.BASE * 0.25 }}
                    >
                      936
                    </Text>
                  </Block>
                </Block>
              )}
            />

            <Block>
              <Text style={styles.text}>
                You should totally like check this out, ok? Why would you use another UI
                library when you have so many components written by Creative Tim and the
                whole React Native community. Galio was created by developers for
                developers.
              </Text>
              <Text style={styles.text}>
                {"A lot of Bacon. I'd really like to eat like a LOT of Bacon :(."}
              </Text>
            </Block>
          </Block>
        </Block>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: theme.COLORS.WHITE,
    borderTopLeftRadius: theme.SIZES.BASE * 2,
    borderTopRightRadius: theme.SIZES.BASE * 2,
    paddingVertical: theme.SIZES.BASE * 2,
    paddingHorizontal: theme.SIZES.BASE * 1.5,
    width,
  },
  navbar: {
    top: statusBarHeight,
    left: 0,
    right: 0,
    zIndex: 9999,
    position: 'absolute',
  },
  text: {
    fontSize: theme.SIZES.FONT * 0.875,
    lineHeight: theme.SIZES.FONT * 1.25,
    marginTop: theme.SIZES.BASE,
  },
  author: {
    marginTop: theme.SIZES.BASE * 2,
  },
});

export default Article;
