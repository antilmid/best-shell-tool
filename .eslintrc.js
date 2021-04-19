module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb-base',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint',
  ],
  rules: {
    'no-param-reassign': 1,
    'import/no-unresolved': 0,
    '@typescript-eslint/no-unused-vars': 2,
    'import/extensions': 0,
    'no-undef': 0,
  },
};
