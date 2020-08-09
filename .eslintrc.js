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
    'spaced-comment': ['error', 'always', { 'markers': ['/'] }],
    '@typescript-eslint/explicit-function-return-type': ['warn', {
      'allowExpressions': true
    }]

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
