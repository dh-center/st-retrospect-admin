module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    }
  },
  plugins: [
    '@typescript-eslint'
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'codex'
  ],
  settings: {
    react: {
      version: 'detect'
    }
  },
  rules: {
    'spaced-comment': ['error', 'always', { 'markers': ['/'] }]
  }
};