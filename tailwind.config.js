// https://tailwindcss.com/docs/configuration/
// https://github.com/tailwindcss/tailwindcss/blob/master/stubs/defaultConfig.stub.js

const blueLight = '#00CDFB';
const hue = '211';

module.exports = {
  prefix: '',
  important: false,
  separator: ':',
  theme: {
    colors: {
      transparent: 'transparent',
      white: '#fff',
      black: 'rgb(55,53,47)',
      brand: {
        // primary: blueLight,
        // primary: '#00A7FF',
        // primary: 'hsl(201, 100%, 50%)',
        // primary: 'hsl(214, 100%, 50%)',
        primary: `hsl(${hue}, 100%, 50%)`,
        blue: '#1b495a',
        blueneutral: '#f1f2f3',
        bluelight: blueLight,
        neutral: '#FAF8F5',
      },
      group: {
        2: 'hsl(110, 63%, 43%)',
        3: 'hsl(179, 63%, 43%)',
      },
      gray: {
        light: 'rgba(0,0,0,0.1)',
        mid: '#aaa',
        dark: '#858585',
      },
      form: {
        good: '#38a169',
        bad: '#e53e3e',
      },
    },
    spacing: {
      px: '1px',
      '2px': '2px',
      0: '0',
      1: '0.25rem',
      2: '0.5rem',
      3: '0.75rem',
      4: '1rem',
      5: '1.25rem',
      6: '1.5rem',
      7: '1.75rem',
      8: '2rem',
      10: '2.5rem',
      12: '3.5rem',
      16: '4rem',
      20: '5rem',
      24: '6rem',
      32: '8rem',
      40: '10rem',
      48: '12rem',
      56: '14rem',
      64: '16rem',
      96: '24rem',
    },
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1040px',
      xl: '1408px',
    },
    fontFamily: {
      title: [
        '"SF Mono"',
      ],
      sans: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        '"Noto Sans"',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
        '"Noto Color Emoji"',
      ],
      serif: ['"PictureHouse One"', 'Georgia', 'Cambria', '"Times New Roman"', 'Times', 'serif'],
      mono: ['Menlo', 'Monaco', 'Consolas', '"Liberation Mono"', '"Courier New"', 'monospace'],
    },
    fontSize: {
      xs: '0.75rem', // 12
      sm: '0.875rem', // 14
      base: '0.9375rem', // 15
      lg: '1.0625rem', // 17
      xl: '1.125rem', // 18
      '2xl': '1.25rem',
      '3xl': '1.3125rem',
      '4xl': '2.25rem',
      '5xl': '2.75rem',
      '6xl': '4rem',
      '7xl': '5rem',
    },
    /* Corresponding to breakpoints */
    responsiveScale: {
      textXs: '0.8',
      textSm: '0.9',
      textMd: '1',
      titleXs: '0.666',
      titleSm: '0.9',
      titleMd: '1',
      blockXs: '0.5',
      blockSm: '0.7',
      blockMd: '1',
      spaceXs: '1',
      spaceSm: '1',
      spaceMd: '1',
      gridXs: '0.5',
      gridSm: '0.9',
      gridMd: '1',
    },
    fontWeight: {
      hairline: '100',
      thin: '200',
      light: '300',
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      extrabold: '800',
      black: '900',
    },
    lineHeight: {
      title: '0.85',
      none: '1',
      tight: '1.2',
      snug: '1.375',
      reduced: '1.42861',
      normal: '1.47059',
      relaxed: '1.625',
      loose: '2',
      nav: '4.5',
    },
    letterSpacing: {
      tighter: '-0.05em',
      tight: '-0.0125em',
      normal: '0',
      wide: '0.025em',
      wider: '0.05em',
      widest: '0.1em',
    },
    textColors: theme => ({
      ...theme('colors'),
      base: theme('colors.gray.dark'),
    }),
    borderColor: theme => ({
      ...theme('colors'),
      default: theme('colors.gray.light', 'currentColor'),
    }),
    opacity: {
      0: '0',
      25: '0.25',
      33: '0.333',
      50: '0.5',
      75: '0.75',
      100: '1',
    },
    container: {
      center: true,
      padding: '2rem',
    },
  },
  corePlugins: {
    float: false,
  },
  plugins: [],
};
