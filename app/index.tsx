import React from 'react';
import {
  StyleSheet,
  ScrollView,
  Platform,
  Dimensions,
} from 'react-native';
import { LinearGradient as ExpoGradient } from 'expo-linear-gradient';

// galio components
import {
  Button, Block, Icon, Text, NavBar,
} from 'galio-framework';
import theme from './theme';
import NavigationMenu from './components/NavigationMenu.js';
import Svg, { Defs, LinearGradient, Stop, Path } from 'react-native-svg';
import * as shape from 'd3-shape';

const BASE_SIZE = theme.SIZES.BASE;
const GRADIENT_BLUE = ['#6B84CA', '#8F44CE'];
const GRADIENT_PINK = ['#D442F8', '#B645F5', '#9B40F8'];
const COLOR_WHITE = theme.COLORS.WHITE;
const COLOR_GREY = theme.COLORS.MUTED;

const statsTitles = ['Jul', 'Aug', 'Sep', 'Oct', 'Nov'];

const cards = [
  {
    title: 'Tasks',
    subtitle: '15 completed tasks',
    icon: 'list-bullet',
    iconFamily: 'Galio',
  },
  {
    title: 'Aquisitions',
    subtitle: '15 completed tasks',
    icon: 'bag-17',
    iconFamily: 'Galio',
  },
  {
    title: 'Cards',
    subtitle: '15 completed tasks',
    icon: 'credit-card',
    iconFamily: 'Galio',
  },
  {
    title: 'Settings',
    subtitle: '15 completed tasks',
    icon: 'settings-gear-65',
    iconFamily: 'Galio',
  },
];

class Dashboard extends React.Component {
  state = {
    isMenuOpen: false,
  };

  toggleMenu = () => {
    this.setState((prevState: any) => ({ isMenuOpen: !prevState.isMenuOpen }));
  };

  renderHeader = () => (
    <NavBar
      title="Dashboard"
      right={(
        <Button
          onlyIcon
          icon="heart"
          iconFamily="fontawesome"
          iconSize={BASE_SIZE}
          iconColor={theme.COLORS.MUTED}
          color="transparent"
          onPress={() => console.log('Heart pressed')}
        />
      )}
      left={(
        <Button
          onlyIcon
          icon="menu"
          iconFamily="ionicon"
          iconSize={BASE_SIZE}
          iconColor={theme.COLORS.ICON}
          color="transparent"
          onPress={this.toggleMenu}
        />
      )}
      style={Platform.OS === 'android' ? { marginTop: theme.SIZES.BASE } : undefined}
    />
  );

  renderStats = () => {
    const screenWidth = Dimensions.get('window').width;
    const chartWidth = screenWidth; // full width, no horizontal padding
    const chartHeight = BASE_SIZE * 10;
    const paddingTop = 10;
    const statsActive = Array.from({ length: 20 }, () => Math.random() * 0.8 + 1);
    const statsInactive = Array.from({ length: 20 }, () => Math.random() * 0.7 + 1);
    const maxY = Math.max(...statsActive, ...statsInactive);
    const usableHeight = chartHeight - paddingTop; // height available for plotting points

    const lineGenerator = shape.line()
      .x((d, i) => (i / (statsActive.length - 1)) * chartWidth)
      .y(d => usableHeight - (d / maxY) * usableHeight + paddingTop)
      .curve(shape.curveNatural);
        const areaPath = (data) => {
      const linePath = lineGenerator(data);
      return `${linePath} L ${chartWidth} ${chartHeight} L 0 ${chartHeight} Z`;
    };

    const linePathActive = lineGenerator(statsActive);
    const linePathInactive = lineGenerator(statsInactive);

    return (
      <Block style={{ marginTop: BASE_SIZE * 1.5, marginBottom: BASE_SIZE * 3, paddingTop: 8 }}>
        <Svg width={chartWidth} height={chartHeight}>
          <Defs>
            <LinearGradient id="gradientInactive" x1="0" y1="0" x2="0" y2="1">
              <Stop offset="0%" stopColor="rgba(0,0,0,0.2)" stopOpacity="0.3" />
              <Stop offset="100%" stopColor="rgba(0,0,0,0.2)" stopOpacity="0" />
            </LinearGradient>
            <LinearGradient id="gradientActive" x1="0" y1="0" x2="0" y2="1">
              <Stop offset="0%" stopColor={theme.COLORS.THEME} />
              <Stop offset="100%" stopColor={theme.COLORS.INFO} />
            </LinearGradient>
          </Defs>

          {/* Inactive filled area */}
          <Path
            d={areaPath(statsInactive)}
            fill="url(#gradientInactive)"
            stroke="none"
          />

          {/* Inactive top contour */}
          <Path
            d={linePathInactive}
            fill="none"
            stroke="rgba(0,0,0,0.1)"
            strokeDasharray="4,4"
            strokeWidth={1}
          />

          {/* Active filled area */}
          <Path
            d={areaPath(statsActive)}
            fill="none"
            stroke="none"
          />

          {/* Active top contour */}
          <Path
            d={linePathActive}
            fill="none"
            stroke={theme.COLORS.THEME}
            strokeWidth={BASE_SIZE * 0.1875}
          />
        </Svg>

        <Block row space="evenly" style={{ marginTop: BASE_SIZE }}>
          {statsTitles.map(title => (
            <Text key={title} size={theme.SIZES.FONT * 0.85} muted>
              {title}
            </Text>
          ))}
        </Block>
      </Block>
    );
  };

  renderCard = (props: any, index: number) => {
    const gradientColors = index % 2 ? GRADIENT_BLUE : GRADIENT_PINK;

    return (
      <Block
        row
        center
        card
        shadow
        space="between"
        style={styles.card}
        key={props.title}
      >
        <ExpoGradient
          start={[0.45, 0.45]}
          end={[0.9, 0.9]}
          colors={gradientColors as any}
          style={[styles.gradient, styles.left]}
        >
          <Icon size={BASE_SIZE} name={props.icon} color={COLOR_WHITE} family={props.iconFamily} />
        </ExpoGradient>

        <Block flex>
          <Text size={BASE_SIZE * 1.125}>{props.title}</Text>
          <Text size={BASE_SIZE * 0.875} muted>{props.subtitle}</Text>
        </Block>
        <Button style={styles.right}>
          <Icon size={BASE_SIZE} name="minimal-right" family="Galio" color={COLOR_GREY} />
        </Button>
      </Block>
    );
  };

  renderCards = () => cards.map((card, index) => this.renderCard(card, index));

  render() {
    return (
      <Block safe flex>
        {this.renderHeader()}

        {this.renderStats()}

        <ScrollView style={{ flex: 1, paddingHorizontal: BASE_SIZE }}>
          {this.renderCards()}
        </ScrollView>

        <NavigationMenu
          isVisible={this.state.isMenuOpen}
          onClose={this.toggleMenu}
          currentScreen="/"
        />
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    borderColor: 'transparent',
    marginVertical: BASE_SIZE / 2,
    padding: BASE_SIZE,
    backgroundColor: COLOR_WHITE,
    shadowOpacity: 0.4,
  },
  left: {
    marginRight: BASE_SIZE,
  },
  right: {
    width: BASE_SIZE * 2,
    backgroundColor: 'transparent',
    elevation: 0,
  },
  gradient: {
    width: BASE_SIZE * 3.25,
    height: BASE_SIZE * 3.25,
    borderRadius: BASE_SIZE * 3.25,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Dashboard;
