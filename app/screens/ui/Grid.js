import React, { useState } from 'react';
import {
  Dimensions, StyleSheet, Platform,
} from 'react-native';
// galio components
import {
  Button, Icon, Block, Text, NavBar,
} from 'galio-framework';
import theme from '../../theme';
import NavigationMenu from '../../components/NavigationMenu';

const { width } = Dimensions.get('screen');
const BASE_SIZE = theme.SIZES.BASE;
const COLOR_WHITE = theme.COLORS.WHITE;

const chunk = (arr, size) => {
  return new Array(Math.ceil(arr.length / size)).fill().map((_, i) =>
    arr.slice(i * size, i * size + size)
  );
};

const grids = [
  { title: 'Facebook', icon: 'facebook', family: 'fontawesome' },
  { title: 'Github', icon: 'github', family: 'fontawesome' },
  { title: 'Instagram', icon: 'instagram', family: 'fontawesome' },
  { title: 'Facebook', icon: 'facebook', family: 'feather' },
  { title: 'Github', icon: 'github', family: 'feather' },
  { title: 'Instagram', icon: 'instagram', family: 'feather' },
  { title: 'Android', icon: 'android', family: 'fontawesome' },
  { title: 'Apple', icon: 'apple', family: 'fontawesome' },
  { title: 'Digg', icon: 'digg', family: 'fontawesome' },
  { title: '500px', icon: '500px', family: 'Entypo' },
  { title: 'App Store', icon: 'app-store', family: 'Entypo' },
  { title: 'Baidu', icon: 'baidu', family: 'Entypo' },
];

const Grid = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(prev => !prev);

  return (
    <Block safe flex>
      <NavBar
        fix
        title="Grid"
        left={(
          <Button
            onlyIcon
            icon="menu"
            iconFamily="ionicon"
            iconSize={BASE_SIZE}
            iconColor={theme.COLORS.ICON}
            color="transparent"
            onPress={toggleMenu}
          />
        )}
        style={Platform.OS === 'android' ? { marginTop: BASE_SIZE } : undefined}
      />

      <NavigationMenu
        isVisible={isMenuOpen}
        onClose={toggleMenu}
        currentScreen="/screens/ui/Grid"
      />

      <Block style={styles.grid}>
        {chunk(grids, 3).map((row, rowId) => (
          <Block row space="evenly" key={`row-${rowId}`}>
            {row.map(grid => (
              <Block shadow middle style={styles.block} key={`grid-${grid.title}`}>
                <Button color="transparent" style={styles.button} onPress={toggleMenu}>
                  <Block flex middle>
                    <Icon name={grid.icon} family={grid.family} size={BASE_SIZE * 1.875} />
                    <Text size={BASE_SIZE * 0.875} style={{ marginTop: BASE_SIZE * 0.25 }}>
                      {grid.title}
                    </Text>
                  </Block>
                </Button>
              </Block>
            ))}
          </Block>
        ))}
      </Block>
    </Block>
  );
};

const styles = StyleSheet.create({
  grid: {
    flex: 1,
    justifyContent: 'space-evenly',
  },
  block: {
    backgroundColor: COLOR_WHITE,
    borderRadius: BASE_SIZE / 2,
    height: width * 0.28,
    width: width * 0.28,
    shadowOpacity: 0.4,
    elevation: BASE_SIZE / 2,
  },
  button: {
    width: 'auto',
    height: 'auto',
  },
});

export default Grid;
