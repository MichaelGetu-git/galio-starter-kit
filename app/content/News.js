import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Image, StyleSheet, ScrollView, Platform,
} from 'react-native';
import Constants from 'expo-constants';

// Galio components
import {
  Button, Block, Card, Text, Icon, NavBar,
} from 'galio-framework';
import theme from '../theme';
import NavigationMenu from '../components/NavigationMenu';

const Author = ({ avatar, title, caption }) => (
  <Block row shadow middle space="between" style={styles.author}>
    <Block flex={0.25}>
      <Image source={{ uri: avatar }} style={styles.avatar} />
    </Block>
    <Block flex={0.7} style={styles.middle}>
      <Text style={{ fontWeight: '500' }}>{title}</Text>
      <Text p muted>{caption}</Text>
    </Block>
    <Block flex={0.5} row middle space="around">
      <Block row middle>
        <Icon name="eye" family="material-community" color={theme.COLORS.MUTED} size={theme.SIZES.FONT * 0.8} />
        <Text size={theme.SIZES.FONT * 0.7} p muted style={{ marginLeft: theme.SIZES.FONT * 0.25 }}>25.6k</Text>
      </Block>
      <Block row middle>
        <Icon name="heart-outline" family="material-community" color={theme.COLORS.MUTED} size={theme.SIZES.FONT * 0.8} />
        <Text size={theme.SIZES.FONT * 0.7} p muted style={{ marginLeft: theme.SIZES.FONT * 0.25 }}>936</Text>
      </Block>
    </Block>
  </Block>
);

Author.propTypes = {
  avatar: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  caption: PropTypes.string.isRequired,
};

const News = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(prev => !prev);

  return (
    <Block safe flex>
      <NavBar
        title="News"
        titleStyle={{ alignSelf: 'flex-start' }}
        leftIconColor={theme.COLORS.MUTED}
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
        style={Platform.OS === 'android' ? { marginTop: theme.SIZES.BASE } : null}
        right={[
          <Button
            key="right-options"
            color="transparent"
            style={styles.button}
          >
            <Icon size={theme.SIZES.BASE * 1.0625} name="fire" family="fontisto" color={theme.COLORS.MUTED} />
          </Button>,
          <Button
            key="right-search"
            color="transparent"
            style={styles.button}
          >
            <Icon size={theme.SIZES.BASE * 1.0625} name="leaf" family="fontawesome5" color={theme.COLORS.MUTED} />
          </Button>,
        ]}
      />
      
      <NavigationMenu
        isVisible={isMenuOpen}
        onClose={toggleMenu}
        currentScreen="/auth/Login"
      />

      <ScrollView style={{ flex: 1 }}>
        <Block flex style={styles.news}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1535649168324-4198731b2252?fit=crop&w=1300&q=80' }}
            style={styles.articleImage}
          />
          <Block style={styles.article}>
            <Text h4>
              I would happily watch a TV show about crabs
            </Text>
            <Text muted style={[styles.text, { marginVertical: theme.SIZES.BASE * 1.3 }]}>
              InterBlocking is super star
            </Text>
            <Text style={styles.text}>
              You should totally read this sutuff, like seriously all yo homies
              love sneak dissing but at least u’re true, right?
            </Text>
            <Text muted style={styles.text}>
              Spicy jalapeno bacon ipsum dolor amet short loin cupidatat est, pork
              pancetta velit kevin occaecat ipsum aliqua ham tri-tip incididunt.
            </Text>
            <Text muted style={styles.text}>
              Irure sirloin nostrud filet mignon capicola strip
              steak, sink pork dolore pig shirt ribs. Et pariatur
              sunt, ribeye esse frankfurter biltong nostrud. Elit
              do filet mignon turkey, temport pastrami ea bacon. In
              tritip id cupim tail ham irure. Drumstick esse ut
              andouille strip steak. Et pariatur sunt, ribeye esse
              frankfurter biltong nostrud. Elit do filet mignon
              turkey, temport pastrami ea bacon. In tritip id
              cupim tail ham irure. Drumstick esse ut andouille
              strip steak.
            </Text>
          </Block>
        </Block>
      </ScrollView>

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
    </Block>
  );
};

const styles = StyleSheet.create({
  article: {
    marginTop: theme.SIZES.BASE * 1.75,
  },
  articleImage: {
    borderRadius: theme.SIZES.BASE / 2,
    height: theme.SIZES.BASE * 13.75,
  },
  news: {
    marginTop: theme.SIZES.BASE / 2,
    paddingBottom: theme.SIZES.BASE / 2,
    justifyContent: 'flex-start',
    paddingHorizontal: theme.SIZES.BASE,
  },
  button: {
    width: theme.SIZES.BASE * 2,
    borderColor: 'transparent',
  },
  author: {
    position: 'absolute',
    right: theme.SIZES.BASE,
    left: theme.SIZES.BASE,
    bottom: Constants.statusBarHeight,
    backgroundColor: theme.COLORS.WHITE,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    elevation: theme.SIZES.BASE / 2,
  },
  text: {
    fontWeight: '400',
    fontSize: theme.SIZES.FONT * 0.875,
    lineHeight: theme.SIZES.BASE * 1.25,
    letterSpacing: 0.3,
    marginBottom: theme.SIZES.BASE,
  },
  avatar: {
    width: theme.SIZES.BASE * 3,
    height: theme.SIZES.BASE * 3,
    borderRadius: (theme.SIZES.BASE * 3) / 2,
  },
  middle: {
    paddingLeft: theme.SIZES.BASE,
  },
});

export default News;
