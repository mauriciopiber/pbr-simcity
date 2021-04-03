module.exports = {
  env: {
    browser: true,
    es2021: true,
    "jest/globals": true
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    // 'airbnb',
    'plugin:testcafe/recommended',
    'plugin:import/typescript',
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended"
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint', 'import', 'jest'],
  rules: {
    // 'jsx-a11y/anchor-is-valid': [
    //   'error',
    //   {
    //     components: ['Link'],
    //     specialLink: ['hrefLeft', 'hrefRight'],
    //     aspects: ['invalidHref', 'preferButton'],
    //   },
    // ],
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': ['error'],
    'react/jsx-filename-extension': [
      2,
      { extensions: ['.js', '.jsx', '.ts', '.tsx'] },
    ],
    'no-underscore-dangle': ['error', { allow: ['_id'] }],
    'react/prop-types': 'off',
    //'no-extraneous-dependencies': 'off',
  },
  overrides: [
    {
      files: ['*.test.ts', '*.spec.ts'],
      rules: {
        'no-unused-expressions': 'off',
      },
    },
  ],

  settings: {
    react: {
      "version": "latest",
    },
    'import/resolver': {
      // node: {
      //   moduleDirectory: ['node_modules', 'components', 'lib'],
      // },
      alias: {
        map: [
          ['@pbr-simcity/web/components/*', './components'],
          ['@pbr-simcity/web/lib/*', './lib'],
        ],
        extensions: ['.ts', '.js', '.jsx', '.tsx', '.json'],
      },
      //   "typescript": {
      //     "directory": [
      //       "components",
      //       "lib"
      //     ]
      //   }
    },
  },
};
