module.exports = {
  env: {
    es6: true,
    node: true,
    browser: true,
    jest: true,
  },
  parser: '@babel/eslint-parser',
  parserOptions: {
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
      jsx: true,
    },
    sourceType: 'module',
  },
  plugins: ['react', 'flowtype'],
  extends: [
    'eslint:recommended',
    'airbnb',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'prettier', // Make sure this is the last
  ],
  globals: {
    __DEV__: true,
  },
  rules: {
    'comma-dangle': ['error', 'only-multiline'],
    'no-invalid-this': 'off',
    'no-return-assign': 'off',
    'no-param-reassign': 'off',
    'no-nested-ternary': 'off',
    'no-confusing-arrow': 'off',
    'react/require-default-props': 'off',
    'react/jsx-filename-extension': ['error', { extensions: ['.js'] }],
    'react/prop-types': [2, { ignore: ['style', 'children', 'dispatch'] }],
    'react/prefer-stateless-function': 'off',
    'react/no-array-index-key': 'off',
    'import/prefer-default-export': 'off',
    'import/no-unresolved': 'error',
    'import/extensions': ['error', { js: 'never' }],
    'import/named': 'error',
    'import/default': 'error',
    'import/namespace': 'error',
    'import/no-absolute-path': 'error',
    'react-hooks/rules-of-hooks': 'error', // Checks rules of Hooks
    'react-hooks/exhaustive-deps': 'warn', // Checks effect dependencies
    'react/destructuring-assignment': ['error', 'always', { ignoreClassFields: true }],
  },
  settings: {
    'import/resolver': {
      'babel-module': {},
    },
  },
};
