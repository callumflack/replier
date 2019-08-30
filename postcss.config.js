module.exports = {
  plugins: [
    /* eslint-disable global-require */
    require('postcss-import'),
    require('tailwindcss')('tailwind.config.js'),
    // eslint-disable-next-line import/no-extraneous-dependencies
    require('autoprefixer')(),
    /* eslint-enable global-require */
  ],
};
