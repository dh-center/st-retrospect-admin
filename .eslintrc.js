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
    'spaced-comment': ['error', 'always', {'markers': ['/']}],
    'jsdoc/require-jsdoc': 0,
    '@typescript-eslint/explicit-function-return-type': ['warn', {
      'allowExpressions': true,
    }],
    '@typescript-eslint/semi': ['error'],
    'react-hooks/exhaustive-deps': 'off',
    '@typescript-eslint/camelcase': 'off',
    'react/jsx-boolean-value': ['warn'],
    'react/jsx-no-useless-fragment': ['warn'],
    'react/jsx-sort-props': ['warn'],
    'react/jsx-sort-default-props': ['warn'],
    "react/jsx-fragments": ['warn', 'syntax'],
    'react/jsx-max-props-per-line': [1, { "when": "multiline" }],
    'jsx-quotes': ["error", "prefer-single"],
    'react/jsx-curly-brace-presence': ["warn", { props: "never", children: "never" }],
  },
  overrides: [
    {
      "files": ["**/*.ts", "**/*.tsx"],
      "rules": {
        "react/prop-types": "off",
        'semi': 'off'
      }
    }
  ]
};
