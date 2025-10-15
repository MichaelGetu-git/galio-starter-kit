import React, { useState } from 'react';
import {
  Dimensions, StyleSheet, ScrollView, Alert, Platform, Linking,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

// galio components
import {
  Text, Block, Button, Card, NavBar, Input,
  Icon,
} from 'galio-framework';
import theme from '../../theme';
import NavigationMenu from '../../components/NavigationMenu';

const { width } = Dimensions.get('screen');

const Components = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(prev => !prev);

  const title = "Components";
  const transparent = false;
  const bgColor = theme.COLORS.WHITE;
  const back = false;
  const white = false;
  const iconColor = theme.COLORS.ICON;
  const titleColor = theme.COLORS.BLACK;
  const shadow = theme.COLORS.GREY;

  // Calculate styles
  const noShadow = ["Pro"].includes(title);
  const headerStyles = [
    !noShadow ? styles.shadow : null,
    transparent ? { backgroundColor: "rgba(0,0,0,0)" } : null,
  ];

  const navbarStyles = [
    styles.navbar,
    bgColor && { backgroundColor: bgColor },
  ];

  return (
    <Block safe flex>
      <NavBar
        title="Galio Components"
        right={(
          <Button
            onlyIcon
            icon="heart"
            iconFamily="fontawesome"
            iconSize={theme.SIZES.BASE}
            iconColor={theme.COLORS.ICON}
            color="transparent"
            onPress={() => Linking.openURL('https://galio.io')}
          />
        )}
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
        style={Platform.OS === 'android' ? { marginTop: theme.SIZES.BASE } : undefined}
      />

      <NavigationMenu
        isVisible={isMenuOpen}
        onClose={toggleMenu}
        currentScreen="/screens/ui/Components"
      />

      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        <Block style={styles.container}>

          {/* Buttons Section */}
          <Block flex style={{ marginBottom: theme.SIZES.BASE }}>
            <Block flex style={{ padding: theme.SIZES.BASE }}>
              <Text h5>Buttons</Text>
            </Block>
            <Block flex center style={{ padding: theme.SIZES.BASE }}>
              <Button style={styles.button} round>Primary</Button>
              <Button color="info" style={styles.button} round>Info</Button>
              <Button style={styles.button} color="success" round>Success</Button>
              <Button color="warning" style={styles.button} round>Warning</Button>
              <Button color="error" style={styles.button} round>Error</Button>
            </Block>
          </Block>

          {/* Typography Section */}
          <Block flex style={{ marginBottom: theme.SIZES.BASE }}>
            <Block flex style={{ padding: theme.SIZES.BASE }}>
              <Text h5>Typography</Text>
            </Block>
            <Block style={{ padding: theme.SIZES.BASE }}>
              <Text style={{ marginVertical: theme.SIZES.FONT / 4 }} h1>Heading 1</Text>
              <Text style={{ marginVertical: theme.SIZES.FONT / 4 }} h2>Heading 2</Text>
              <Text style={{ marginVertical: theme.SIZES.FONT / 4 }} h3>Heading 3</Text>
              <Text style={{ marginVertical: theme.SIZES.FONT / 4 }} h4>Heading 4</Text>
              <Text style={{ marginVertical: theme.SIZES.FONT / 4 }} h5>Heading 5</Text>
              <Text style={{ marginVertical: theme.SIZES.FONT / 4 }} p>Paragraph</Text>
              <Text style={{ marginVertical: theme.SIZES.FONT / 4 }} p muted>This is a muted paragraph.</Text>
            </Block>
          </Block>

          {/* Inputs Section */}
          <Block flex>
            <Block flex style={{ padding: theme.SIZES.BASE }}>
              <Text h5>Inputs</Text>
            </Block>
            <Block style={{ padding: theme.SIZES.BASE }}>
              <Input rounded placeholder="placeholder" />
              <Input
                rounded
                placeholder="theme"
                placeholderTextColor={theme.COLORS.THEME}
                style={{ borderColor: theme.COLORS.THEME }}
              />
              <Input
                rounded
                placeholder="info"
                placeholderTextColor={theme.COLORS.INFO}
                style={{ borderColor: theme.COLORS.INFO }}
              />
              <Input
                rounded
                placeholder="warning"
                placeholderTextColor={theme.COLORS.WARNING}
                style={{ borderColor: theme.COLORS.WARNING }}
              />
              <Input
                rounded
                placeholder="error"
                placeholderTextColor={theme.COLORS.ERROR}
                style={{ borderColor: theme.COLORS.ERROR }}
              />
              <Input
                rounded
                placeholder="success"
                placeholderTextColor={theme.COLORS.SUCCESS}
                style={{ borderColor: theme.COLORS.SUCCESS }}
              />
              <Input rounded password viewPass placeholder="password" />
              <Input rounded icon="trophy" family="fontawesome" placeholder="icon right" right />
              <Input
                rounded
                borderless
                placeholder="borderless"
                placeholderTextColor={theme.COLORS.WHITE}
                color={theme.COLORS.WHITE}
                bgColor={theme.COLORS.THEME}
              />
            </Block>
          </Block>

          {/* Navigation Bars Section */}
          <Block flex style={{ marginBottom: theme.SIZES.BASE }}>
            <Block flex style={{ padding: theme.SIZES.BASE }}>
              <Text h5>Navigation</Text>
            </Block>
            <Block>
              {/* 1. Chart NavBar */}
              <NavBar
                back
                title="Chart"
                leftIconSize={32}
                leftIconColor={theme.COLORS.MUTED}
                rightStyle={{ alignSelf: 'center', minWidth: 40 }}
                onLeftPress={() => Alert.alert('Back')}
                style={{ width, marginHorizontal: -(theme.SIZES.BASE - 2) }}
                right={(
                  <Button
                    onlyIcon
                    icon="chevron-left"
                    color="transparent"
                    iconFamily="fontawesome5"
                    iconColor={theme.COLORS.MUTED}
                    iconSize={theme.SIZES.BASE * 1.0625}
                    onPress={() => Alert.alert('Settings')}
                  />
                )}
              />

              {/* Custom NavBar - Fixed component name and structure */}
              <NavBar
                back={back}
                title="Yared"
                style={navbarStyles}
                transparent={transparent}
                rightStyle={{ alignItems: "center" }}
                left={(
                  <Icon name="menu" family="ionicon" color={iconColor} />
                )}
                leftStyle={{
                  paddingVertical: 12,
                  flex: 0.2,
                  marginTop: -75,
                }}
              />

              {/* 2. Feed NavBar */}
              <NavBar
                back
                title="Feed"
                titleStyle={{ alignSelf: 'flex-start'}}
                onLeftPress={() => Alert.alert('Menu')}
                style={{ width, marginHorizontal: -(theme.SIZES.BASE - 2) }}
                right={[
                  <Button
                    key="right-heart"
                    onlyIcon
                    icon="heart"
                    iconFamily="feather"
                    color="transparent"
                    iconColor={theme.COLORS.BLACK}
                    iconSize={theme.SIZES.BASE * 1.0625}
                    onPress={() => Alert.alert('Like!')}
                    style={{ marginRight: theme.SIZES.BASE }}
                  />,
                  <Button
                    key="right-search"
                    onlyIcon
                    icon="search"
                    color="transparent"
                    iconFamily="font-awesome"
                    iconColor={theme.COLORS.BLACK}
                    iconSize={theme.SIZES.BASE * 1.0625}
                    onPress={() => Alert.alert('Search')}
                  />,
                ]}
              />

              {/* 3. Terms of Services NavBar */}
              <NavBar
                back
                leftIconSize={theme.SIZES.BASE * 2.0625}
                title="Terms of Services"
                onLeftPress={() => Alert.alert('Back')}
                style={{ width, marginHorizontal: -(theme.SIZES.BASE - 2) }}
                right={[
                  <Button
                    key="right-location"
                    onlyIcon
                    icon="map-pin"
                    iconFamily="fontawesome"
                    color="transparent"
                    iconColor={theme.COLORS.MUTED}
                    iconSize={theme.SIZES.BASE * 1.0625}
                    onPress={() => Alert.alert('Location!')}
                    style={{ marginRight: theme.SIZES.BASE }}
                  />,
                  <Button
                    key="right-search"
                    onlyIcon
                    icon="search"
                    color="transparent"
                    iconFamily="font-awesome"
                    iconColor={theme.COLORS.MUTED}
                    iconSize={theme.SIZES.BASE * 1.0625}
                    onPress={() => Alert.alert('Search')}
                  />,
                ]}
              />

              {/* 4. Discover NavBar */}
              <NavBar
                title="Discover"
                style={{ backgroundColor: theme.COLORS.THEME, width, marginHorizontal: -(theme.SIZES.BASE - 2) }}
                rightStyle={{ alignSelf: 'center', minWidth: 40 }}
                leftIconColor={theme.COLORS.WHITE}
                onLeftPress={() => Alert.alert('Menu')}
                right={(
                  <Button
                    onlyIcon
                    color="transparent"
                    icon="shopping-cart"
                    iconFamily="font-awesome"
                    iconColor={theme.COLORS.WHITE}
                    iconSize={theme.SIZES.BASE * 1.0625}
                    onPress={() => Alert.alert('Cart')}
                  />
                )}
              />
            </Block>
          </Block>

          {/* Cards Section */}
          <Block flex>
            <Block flex style={{ padding: theme.SIZES.BASE }}>
              <Text h5>Cards</Text>
            </Block>
            <Block flex space="between" style={styles.cards}>
              <Card
                flex
                borderless
                shadowColor={theme.COLORS.BLACK}
                style={styles.card}
                title="Christopher Moon"
                caption="139 minutes ago"
                location="Los Angeles, CA"
                avatar="http://i.pravatar.cc/100?id=pineaple"
                imageBlockStyle={styles.cardNoRadius}
                image="https://images.unsplash.com/photo-1494252713559-f26b4bf0b174?w=840&q=300"
              />

              <Card
                flex
                borderless
                shadowColor={theme.COLORS.BLACK}
                style={styles.card}
                title="Christopher Moon"
                caption="139 minutes ago"
                location="Los Angeles, CA"
                avatar="http://i.pravatar.cc/100?id=skater"
                imageStyle={styles.cardImageRadius}
                imageBlockStyle={{ padding: theme.SIZES.BASE / 2 }}
                image="https://images.unsplash.com/photo-1497802176320-541c8e8de98d?&w=1600&h=900&fit=crop&crop=entropy&q=300"
              />

              <Card
                flex
                borderless
                shadowColor={theme.COLORS.BLACK}
                style={styles.card}
                title="Christopher Moon"
                titleColor={theme.COLORS.WHITE}
                caption="139 minutes ago"
                avatar="http://i.pravatar.cc/100?id=skater"
                footerStyle={styles.cardFull}
                imageStyle={{ height: theme.SIZES.BASE * 13.75 }}
                image="https://images.unsplash.com/photo-1506321806993-0e39f809ae59?&w=1200&h=1200&fit=crop&crop=entropy&q=300"
              >
                <LinearGradient colors={['transparent', 'rgba(0,0,0, 0.8)']} style={styles.cardGradient} />
              </Card>
            </Block>
          </Block>
        </Block>
      </ScrollView>
    </Block>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 12,
    position: "relative",
  },
  title: {
    fontSize: 18,    
    marginTop: -75, // margen del titulo
    fontFamily: "montserrat-bold",
  },
  navbar: {
    paddingVertical: 0,
    paddingBottom: theme.SIZES.BASE * 1.5,
    paddingTop: 100, // Altura del header
    zIndex: 5,
  },
  shadow: {
    backgroundColor: theme.COLORS.WHITE,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.2,
    elevation: 3,
  },
  notify: {
    backgroundColor: theme.COLORS.SUCCESS, // Fixed: removed nowTheme reference
    borderRadius: 4,
    height: theme.SIZES.BASE / 2,
    width: theme.SIZES.BASE / 2,
    position: "absolute",
    top: 9,
    right: 11,
  },
  header: {
    backgroundColor: theme.COLORS.WHITE,
  },
  divider: {
    borderRightWidth: 0.3,
    borderRightColor: theme.COLORS.ICON,
  },
  search: {
    height: 48,
    width: width - 32,
    marginHorizontal: 16,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: theme.COLORS.BORDER, // Fixed: removed nowTheme reference
  },
  options: {
    marginBottom: 24,
    marginTop: 10,
    elevation: 4,
  },
  tab: {
    backgroundColor: theme.COLORS.TRANSPARENT,
    width: width * 0.35,
    borderRadius: 0,
    borderWidth: 0,
    height: 24,
    elevation: 0,
  },
  tabTitle: {
    lineHeight: 19,
    fontWeight: "400",
    color: theme.COLORS.HEADER, // Fixed: removed nowTheme reference
  },
  social: {
    width: theme.SIZES.BASE * 3.5,
    height: theme.SIZES.BASE * 3.5,
    borderRadius: theme.SIZES.BASE * 1.75,
    justifyContent: "center",
  },
  container: {
    padding: 14,
    justifyContent: 'flex-start',
    backgroundColor: theme.COLORS.WHITE,
  },
  cards: {
    flex: 1,
    backgroundColor: theme.COLORS.WHITE,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  card: {
    borderWidth: 0,
    backgroundColor: theme.COLORS.WHITE,
    width: width - theme.SIZES.BASE * 2,
    marginVertical: theme.SIZES.BASE * 0.875,
  },
  cardFooter: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginVertical: theme.SIZES.BASE / 2,
    paddingHorizontal: theme.SIZES.BASE,
    paddingVertical: theme.SIZES.BASE / 2,
    backgroundColor: theme.COLORS.TRANSPARENT,
  },
  cardNoRadius: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  cardAvatar: {
    width: theme.SIZES.BASE * 2.5,
    height: theme.SIZES.BASE * 2.5,
    borderRadius: theme.SIZES.BASE * 1.25,
  },
  cardTitle: {
    justifyContent: 'center',
    paddingLeft: theme.SIZES.BASE / 2,
  },
  cardImageContainer: {
    borderWidth: 0,
    overflow: 'hidden',
  },
  cardImageRadius: {
    borderRadius: theme.SIZES.BASE * 0.1875,
  },
  cardImage: {
    width: 'auto',
    height: theme.SIZES.BASE * 12.5,
  },
  cardRounded: {
    borderRadius: theme.SIZES.BASE * 0.5,
  },
  cardFull: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
  },
  cardGradient: {
    bottom: 0,
    left: 0,
    right: 0,
    height: 90,
    position: 'absolute',
    overflow: 'hidden',
    borderBottomRightRadius: theme.SIZES.BASE * 0.5,
    borderBottomLeftRadius: theme.SIZES.BASE * 0.5,
  },
});

export default Components;