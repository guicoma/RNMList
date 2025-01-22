/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

export const Colors = {
  light: {
    text: '#11181C',
    background: '#fff',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
    statusBadgeAlive: '#08C952',
    statusBadgeDead: '#E50914',
    statusBadgeunknown: 'grey',
    cardBackground: '#f5f5f5',
    detailsBackground: '#f5f5f5',
    detailsBorder: '#cbcbcb',
    
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
    statusBadgeAlive: '#08C952',
    statusBadgeDead: '#E50914',
    statusBadgeunknown: 'grey',
    cardBackground: '#004925',
    detailsBackground: '#111111',
    detailsBorder: '#252525',
  },
};
