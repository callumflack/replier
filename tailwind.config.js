// https://tailwindcss.com/docs/configuration/
// https://github.com/tailwindcss/tailwindcss/blob/master/stubs/defaultConfig.stub.js

const blueLight = '#00CDFB';
// const hue = '211';
// const hue = '39';
// const saturation = '100';
// const lightness = '40';

module.exports = {
  prefix: '',
  important: false,
  separator: ':',
  hsl: {
    hue: '39',
    saturation: '100%',
    lightness: '40%',
  },
  theme: {
    colors: {
      transparent: 'transparent',
      white: '#fdfdfd',
      black: 'rgb(49, 48, 45)',
      blackgray: 'rgba(49, 48, 45, 0.7)',
      scheme: {
        primary: "var(--scheme-primary)",
        text: "var(--scheme-text)",
        "text-gray": "var(--scheme-text-gray)",
        "text-border": "var(--scheme-text-border)",
        border: "var(--scheme-border)",
        bg: "var(--scheme-bg)",
        "bg-html": "var(--scheme-bg-html)",
        "bg-tint": "var(--scheme-bg-tint)",
        "bg-dark": "var(--scheme-bg-dark)",
      },
      brand: {
        // primary: `hsl(36, 100%, 33%)`, // brown HSL original
        // primary: `hsl(272, 80%, 46%)`, // brown HSL
        // primary: `hsl(44, 100%, 43%)`, // yellow
        primary: `hsl(211, 100%, 50%)`,
        primarys: `211, 100%, 50%`,
        blue: '#1b495a',
        blueneutral: '#f1f2f3',
        bluelight: blueLight,
        neutral: '#f4f2f0',
      },
      gray: {
        lightest: 'rgba(0,0,0,0.03)',
        light: 'rgba(0,0,0,0.1)',
        mid: '#bbb',
        dark: '#858585',
      },
      form: {
        good: '#38a169',
        bad: '#e53e3e',
      },
    },
    bezier: {
      thisalso: "cubic-bezier(0.19, 1, 0.22, 1)",
    },
    screens: {
      mobile: { max: "639px" },
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1440px',
      "2xl": "1920px"
    },
    /* Corresponding to breakpoints */
    responsiveScale: {
      textXs: '0.857142857', // 14 > 12
      textSm: '0.909090909',
      textMd: '1',
      titleXs: '0.842105263', // 19 > 16
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
    fontSize: {
      xs: '11px',
      sm: '13px',
      base: '15px',
      lg: '17px',
      xl: '18px',
      '2xl': '19px',
      '3xl': '21px',
      '4xl': '24px',
      '5xl': '36px',
      '6xl': '44px',
      '7xl': '64px',
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
      subtitle: '0.05em',
      wide: '0.025em',
      wider: '0.05em',
      widest: '0.1em',
    },
    container: {
      center: true,
      padding: 'var(--grid-inset)',
    },
    spacing: {
      px: '1px',
      '2px': '2px',
      'inset': 'var(--grid-inset)',
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
      w1: "calc(8 / var(--viewport-basis) * 100vw)",
      w2: "calc(16 / var(--viewport-basis) * 100vw)",
      w3: "calc(24 / var(--viewport-basis) * 100vw)",
      w4: "calc(32 / var(--viewport-basis) * 100vw)",
      w5: "calc(40 / var(--viewport-basis) * 100vw)",
      w6: "calc(60 / var(--viewport-basis) * 100vw)",
      w7: "calc(120 / var(--viewport-basis) * 100vw)",
      w8: "calc(160 / var(--viewport-basis) * 100vw)",
      w9: "calc(240 / var(--viewport-basis) * 100vw)",
      w10: "calc(320 / var(--viewport-basis) * 100vw)",
      w11: "calc(560 / var(--viewport-basis) * 100vw)",
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
    zIndex: {
      auto: "auto",
      "0": "0",
      "10": "10",
      "20": "20",
      "30": "30",
      "40": "40",
      "50": "50",
      "100": "100"
    },
    fontFamily: {
      title: [
        'IBMPlexMono',
        'Menlo', 'Monaco', 'Consolas', '"Liberation Mono"', '"Courier New"', 'monospace',
      ],
      sans: [
        // 'Graphik',
        'IBMPlexSans',
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
      serif: ['Georgia', 'Cambria', '"Times New Roman"', 'Times', 'serif'],
      mono: ['Menlo', 'Monaco', 'Consolas', '"Liberation Mono"', '"Courier New"', 'monospace'],
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
  },
  corePlugins: {
    float: false,
  },
  plugins: [],
};
