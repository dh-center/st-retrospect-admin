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
  },
  overrides: [
    {
      "files": ["**/*.tsx"],
      "rules": {
        "react/prop-types": "off"
      }
    }
  ]
};
