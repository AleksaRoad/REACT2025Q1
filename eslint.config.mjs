import { FlatCompat } from '@eslint/eslintrc';
import eslintConfigPrettier from 'eslint-config-prettier';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import vitest from 'eslint-plugin-vitest';
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
      ...reactHooks.configs.recommended.rules,
      'react-compiler/react-compiler': 'error',
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
      ...vitest.configs.recommended.rules,
      'no-console': ['error', { allow: ['error'] }],
      'perfectionist/sort-imports': [
        'error',
        {
          customGroups: {
            type: {
              'my-internal-type': '^@/.+',
            },
            value: {
              'my-internal': '^@/.+',
            },
          },
          groups: [
            ['builtin', 'external'],
            'type',
            'my-internal',
            'my-internal-type',
            ['parent', 'sibling', 'index'],
            ['parent-type', 'sibling-type', 'index-type'],
            'internal',
            'internal-type',
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
