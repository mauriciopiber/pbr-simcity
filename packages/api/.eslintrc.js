module.exports = {
  env: { browser: true, es2021: true, 'jest/globals': true },
  extends: [
    'airbnb-base',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: { ecmaVersion: 2018, sourceType: 'module', project: './tsconfig.json',  tsconfigRootDir: __dirname, },
  plugins: ['@typescript-eslint', 'jest'],
  rules: {
    'prefer-arrow-functions': 'off',
    'no-underscore-dangle': ['error', { allow: ['_id'] }],
    'import/no-extraneous-dependencies': 0,
  },
  settings: {
    'import/resolver': {
      "node": {
        "extensions": [".js", ".jsx", ".ts", ".tsx"]
      },
      alias: {
        map: [
          ['@pbr-simcity/api/src', './src']
        ],
        "extensions": [".js", ".jsx", ".ts", ".tsx"]
      },
    },
  },
};
