import React, { useState } from 'react';
import {
  Alert,
  Dimensions,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
// galio component
import {
  Block, Button, Input, Text, NavBar,
} from 'galio-framework';
import theme from '../../theme';
import NavigationMenu from '../../components/NavigationMenu';

const { width } = Dimensions.get('window');

const MARGIN_LEFT = '5%';
const SOCIAL_ICON_SIZE = theme.SIZES.BASE * 1.5;
const SOCIAL_BTN_SIZE = theme.SIZES.BASE * 3;

const Registerv2 = () => {
  const [state, setState] = useState({
    name: '',
    lastName: '',
    email: '',
    password: '',
    isMenuOpen: false,
  });


  const handleChange = (name, value) => {
    setState(prev => ({ ...prev, [name]: value }));
  };

  const handleOnPressSocial = () => Alert.alert('Oops', 'Not Implemented');

  const handleSignUp = () => {
    const {
      name, lastName, email, password,
    } = state;

    Alert.alert('Sign up action', `Name: ${name}
Last Name: ${lastName}
Email: ${email}
Password: ${password}`);
  };


  const toggleMenu = () => {
    setState(prev => ({ ...prev, isMenuOpen: !prev.isMenuOpen }));
  };

  return (
    <Block safe flex style={styles.container}>
      <NavBar
        title="Sign Up"
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
      />
      <NavigationMenu
        isVisible={state.isMenuOpen}
        onClose={toggleMenu}
        currentScreen="/screens/auth/Login"
      />
      <ScrollView style={styles.flex} keyboardShouldPersistTaps="handled">
        <KeyboardAvoidingView
          behavior="position"
          keyboardVerticalOffset={5}
        >
          <Header title="Create new account" />
          <Block flex>
            <SocialButtons
              onPressFacebook={handleOnPressSocial}
              onPressTwitter={handleOnPressSocial}
              onPressInstagram={handleOnPressSocial}
            />
            <Text muted center size={theme.SIZES.FONT * 0.875}>
              or Sign Up with email
            </Text>
          </Block>
          <Block flex middle>
            <Form handleChange={handleChange} />
            <SignButtons
            />
          </Block>
        </KeyboardAvoidingView>
      </ScrollView>
    </Block>
  );
};

const Header = ({ title }) => (
  <Block left style={styles.header}>
    <Text h3>{title}</Text>
  </Block>
);

const SocialButtons = ({
  onPressFacebook,
  onPressTwitter,
  onPressInstagram,
}) => (
  <Block
    row
    center
    space="between"
    style={styles.socialContainer}
  >
    <Block flex middle right>
      <Button
        round
        onlyIcon
        iconSize={SOCIAL_ICON_SIZE}
        icon="facebook"
        iconFamily="fontisto"
        onPress={onPressFacebook}
        color={theme.COLORS.FACEBOOK}
        shadowColor={theme.COLORS.FACEBOOK}
        iconColor={theme.COLORS.WHITE}
        style={styles.social}
      />
    </Block>
    <Block flex middle center>
      <Button
        round
        onlyIcon
        iconSize={SOCIAL_ICON_SIZE}
        icon="twitter"
        iconFamily="fontisto"
        onPress={onPressTwitter}
        color={theme.COLORS.TWITTER}
        shadowColor={theme.COLORS.TWITTER}
        iconColor={theme.COLORS.WHITE}
        style={styles.social}
      />
    </Block>
    <Block flex middle left>
      <Button
        round
        onlyIcon
        iconSize={SOCIAL_ICON_SIZE}
        icon="instagram"
        iconFamily="fontisto"
        onPress={onPressInstagram}
        color={theme.COLORS.DRIBBBLE}
        shadowColor={theme.COLORS.DRIBBBLE}
        iconColor={theme.COLORS.WHITE}
        style={styles.social}
      />
    </Block>
  </Block>
);

const Form = ({ handleChange }) => (
  <Block style={{ marginBottom: 20 }}>
    <Input
      borderless
      placeholder="Name"
      style={styles.input}
      onChangeText={text => handleChange('name', text)}
    />
    <Input
      borderless
      placeholder="Last name"
      style={styles.input}
      onChangeText={text => handleChange('lastName', text)}
    />
    <Input
      borderless
      type="email-address"
      placeholder="Email"
      autoCapitalize="none"
      style={styles.input}
      onChangeText={text => handleChange('email', text)}
    />
    <Input
      borderless
      password
      viewPass
      placeholder="Password"
      style={styles.input}
      onChangeText={text => handleChange('password', text)}
    />
  </Block>
);

const SignButtons = ({ handleSignUp, handleSignIn }) => (
  <Block flex center style={{ marginBottom: 20 }}>
    <Button
      shadowless
      style={styles.button}
      round
      color="info"
      onPress={handleSignUp}
    >
      Sign up
    </Button>
    <Button
      round
      color="transparent"
      style={[styles.button, styles.borderColor]}
      onPress={handleSignIn}
    >
      <Text center color={theme.COLORS.BLACK}>
        Sign In
      </Text>
    </Button>
  </Block>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.COLORS.WHITE,
    paddingTop: 15,
  },
  flex: {
    flex: 1,
  },
  social: {
    width: SOCIAL_BTN_SIZE,
    height: SOCIAL_BTN_SIZE,
    borderRadius: theme.SIZES.BASE * 1.75,
    justifyContent: 'center',
  },
  socialContainer: {
    marginVertical: theme.SIZES.BASE * 1.875,
  },
  input: {
    alignSelf: 'center',
    width: width * 0.89,
    borderBottomColor: theme.COLORS.BLACK,
    borderWidth: theme.SIZES.BASE * 0.04,
    borderRadius: 0,
    paddingHorizontal: 0,
  },
  button: {
    marginVertical: 10,
    width: width * 0.89,
  },
  borderColor: {
    borderColor: theme.COLORS.GREY,
  },
  header: {
    width: '50%',
    marginLeft: MARGIN_LEFT,
  },
});

export default Registerv2;
