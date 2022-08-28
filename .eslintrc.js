module.exports = {
  parser: "@typescript-eslint/parser",
  extends: [
    "airbnb/hooks",
    'eslint:recommended',
    'plugin:react/recommended',
    "plugin:@typescript-eslint/recommended"
  ],
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    es2021: true,
    node: true,
  },
  parserOptions: {
    ecmaVersion: 'latest',
    ecmaFeatures: {
      jsx: true,
    },
    sourceType: 'module'
  },
  ignorePatterns: [
    '.eslint*',
    '**/dist/',
    '**/node_modules'
  ],
  plugins: [
    '@typescript-eslint',
    'react-hooks'
  ],
  rules: {
    'react-hooks/rules-of-hooks': "error",
    'react-hooks/exhaustive-deps': "warn",
    'react/prop-types': "off",
    'react/no-children-prop': 'disable',
    'eol-last': 'error',
    // Indentation
    'no-mixed-spaces-and-tabs': 2,
    indent: [2, 2],
    offsetTernaryExpressions: 0,
    // Variable names
    camelcase: 2,
    // Language constructs
    curly: 2,
    'func-style': [2, 'expression'],
    'no-var': 2,
    'prefer-const': 2,
    // Semicolons
    semi: 2,
    'no-extra-semi': 2,
    // Padding & additional whitespace (preferred but optional)
    'brace-style': [2, '1tbs', { allowSingleLine: true }],
    'semi-spacing': 1,
    'key-spacing': 1,
    'block-spacing': 1,
    'comma-spacing': 1,
    'no-multi-spaces': 1,
    'space-before-blocks': 1,
    'keyword-spacing': [1, { before: true, after: true }],
    'space-infix-ops': 1,
    // Minuta
    'comma-style': [2, 'last'],
    // 'prefer-arrow-functions/prefer-arrow-functions': ['warn'],
    'no-console': [2, { allow: ['info', 'warn', 'error'] }],
    quotes: [1, 'single']
  },
  settings: {
    react: {
      pragma: "React",
      version: "detect"
    }
  }
}