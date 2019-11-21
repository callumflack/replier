module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-plusplus': 'off',
    'prefer-destructuring': 'off',
    'import/extensions': ['error', 'ignorePackages'],
    'vue/no-textarea-mustache': 'off',
    'max-len': ['error', 110],
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**test*.{j,t}s?(x)',
      ],
      env: {
        jest: true,
      },
    },
  ],
};
