module.exports = {
  env: {
    browser: true,
    es2021: true,
    es6: true,
    worker: true,
  },
  extends: [
    'alloy',
    'alloy/react',
    'plugin:react/recommended',
    'eslint:recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 13,
    sourceType: 'module',
  },
  globals: {
    NodeJS: true,
  },
  plugins: ['react', 'react-hooks', '@typescript-eslint'],
  rules: {
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'react/display-name': 'off',
    'no-param-reassign': 'off',
    'max-params': '4',
  },
};
