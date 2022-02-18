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
    ecmaVersion: 13,
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint',
  ],
  rules: {
    'no-console': 'off',
    'default-case': ['error', { commentPattern: '^skip\\sdefault' }],
    'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
    'no-bitwise': ['error', { allow: ['~'] }], // Shitty integer division/floor hack
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      parserOptions: {
        project: './tsconfig.json',
      },
      extends: [
        'airbnb-typescript/base',
      ],
    },
  ],
};
