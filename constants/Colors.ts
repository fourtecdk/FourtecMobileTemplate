// Fourtec brand colors
export const FourtecColors = {
  navyDark: '#0d1b2e',
  navyMid: '#112240',
  teal: '#00b4cc',
  tealDark: '#0097aa',
  white: '#ffffff',
  lightGray: '#a8b2c1',
  cardBg: '#ffffff',
};

const tintColorLight = FourtecColors.teal;
const tintColorDark = FourtecColors.teal;

export default {
  light: {
    text: FourtecColors.navyDark,
    background: FourtecColors.white,
    tint: tintColorLight,
    tabIconDefault: '#8a9bb0',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: FourtecColors.white,
    background: FourtecColors.navyDark,
    tint: tintColorDark,
    tabIconDefault: '#4a6080',
    tabIconSelected: tintColorDark,
  },
};
