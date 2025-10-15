import React, { useState } from 'react';
import {
  Alert,
  Dimensions,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
// galio component
import {
  Block, Button, Input, Text, NavBar,
} from 'galio-framework';
import theme from '../../theme';
import NavigationMenu from '../../components/NavigationMenu';

const { height, width } = Dimensions.get('window');

const Register = () => {
  const [user, setUser] = useState('-');
  const [email, setEmail] = useState('-');
  const [password, setPassword] = useState('-');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(prev => !prev);

  return (
    <Block safe flex style={{ backgroundColor: theme.COLORS.WHITE }}>
      <NavBar
        title="Sign Up"
        onLeftPress={() => navigation.openDrawer()}
        style={Platform.OS === 'android' ? { marginTop: theme.SIZES.BASE } : null}
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
        isVisible={isMenuOpen}
        onClose={toggleMenu}
        currentScreen="/screens/auth/Register"
      />
      <KeyboardAvoidingView style={styles.container} behavior="height" enabled>
        <Block
          flex
          center
          style={{ marginTop: theme.SIZES.BASE * 1.875, marginBottom: height * 0.1 }}
        >
          <Text
            muted
            center
            size={theme.SIZES.FONT * 0.875}
            style={{ paddingHorizontal: theme.SIZES.BASE * 2.3 }}
          >
            This is the perfect place to write a short description
            of this step and even the next steps ahead
          </Text>
          <Block row center space="between" style={{ marginVertical: theme.SIZES.BASE * 1.875 }}>
            <Block flex middle right>
              <Button
                round
                onlyIcon
                iconSize={theme.SIZES.BASE * 1.625}
                icon="facebook"
                iconFamily="fontisto"
                onPress={() => Alert.alert('Not implemented')}
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
                iconSize={theme.SIZES.BASE * 1.625}
                icon="twitter"
                iconFamily="fontisto"
                onPress={() => Alert.alert('Not implemented')}
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
                iconSize={theme.SIZES.BASE * 1.625}
                icon="dribbble"
                iconFamily="fontisto"
                onPress={() => Alert.alert('Not implemented')}
                color={theme.COLORS.DRIBBBLE}
                shadowColor={theme.COLORS.DRIBBBLE}
                iconColor={theme.COLORS.WHITE}
                style={styles.social}
              />
            </Block>
          </Block>
          <Text muted center size={theme.SIZES.FONT * 0.875}>
            or be classical
          </Text>
        </Block>

        <Block flex={2} center space="between">
          <Block flex={2}>
            <Input
              rounded
              placeholder="Username"
              autoCapitalize="none"
              style={{ width: width * 0.9 }}
              onChangeText={setUser}
            />
            <Input
              rounded
              type="email-address"
              placeholder="Email"
              autoCapitalize="none"
              style={{ width: width * 0.9 }}
              onChangeText={setEmail}
            />
            <Input
              rounded
              password
              viewPass
              placeholder="Password"
              style={{ width: width * 0.9 }}
              onChangeText={setPassword}
            />
          </Block>
          <Block flex middle>
            <Button
              round
              color="error"
              onPress={() => Alert.alert(
                'Sign up action',
                `Username: ${user}\nEmail: ${email}\nPassword: ${password}`,
              )}
            >
              Sign up
            </Button>
            <Button color="transparent" shadowless >
              <Text center color={theme.COLORS.ERROR} size={theme.SIZES.FONT * 0.75}>
                Already have an account? Sign In
              </Text>
            </Button>
          </Block>
        </Block>
      </KeyboardAvoidingView>
    </Block>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingTop: theme.SIZES.BASE * 0.3,
    paddingHorizontal: theme.SIZES.BASE,
    backgroundColor: theme.COLORS.WHITE,
  },
  social: {
    width: theme.SIZES.BASE * 3.5,
    height: theme.SIZES.BASE * 3.5,
    borderRadius: theme.SIZES.BASE * 1.75,
    justifyContent: 'center',
  },
});

export default Register;
