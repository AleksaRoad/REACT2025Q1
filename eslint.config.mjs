import { FlatCompat } from '@eslint/eslintrc';
import eslintConfigPrettier from 'eslint-config-prettier';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  ...compat.plugins('perfectionist'),
  ...compat.config(eslintConfigPrettier),

  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      '@typescript-eslint/consistent-type-exports': 'error',
      '@typescript-eslint/consistent-type-imports': 'error',
      'no-console': 'off',
      'perfectionist/sort-imports': [
        'error',
        {
          customGroups: {
            type: {
              'my-internal-type': '^@/.+',
            },
            value: {
              'my-internal': '^@/.+',
              next: '^next',
            },
          },
          groups: [
            'next',
            ['builtin', 'external'],
            'type',
            'internal',
            ['parent', 'sibling', 'index'],
            'unknown',
            'style',
          ],
        },
      ],
      'perfectionist/sort-interfaces': ['error'],
      'perfectionist/sort-objects': [
        'error',
        {
          type: 'alphabetical',
        },
      ],
    },
  },
];

export default eslintConfig;
