import jsxA11y from 'eslint-plugin-jsx-a11y';
import eslintPrettier from 'eslint-config-prettier';
import js from '@eslint/js';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import react from 'eslint-plugin-react';
import tseslint from 'typescript-eslint';
import reactCompiler from 'eslint-plugin-react-compiler';
import jsDom from 'eslint-plugin-jest-dom';
import eslintTestingLibrary from 'eslint-plugin-testing-library';
import vitest from '@vitest/eslint-plugin';
import perfectionist from 'eslint-plugin-perfectionist';

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [
      js.configs.recommended,
      ...tseslint.configs.strict,
      eslintPrettier,
    ],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
      ecmaVersion: 2020,
      globals: { ...vitest.environments.env.globals },
    },
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'react-compiler': reactCompiler,
      jsxA11y,
      vitest,
      jsDom,
      eslintTestingLibrary,
      perfectionist,
    },
    rules: {
      '@typescript-eslint/consistent-type-exports': 'error',
      '@typescript-eslint/consistent-type-imports': 'error',
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      'react-compiler/react-compiler': 'error',
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
      ...vitest.configs.recommended.rules,
      'no-console': ['error', { allow: ['error'] }],
      'perfectionist/sort-objects': [
        'error',
        {
          type: 'alphabetical',
        },
      ],
      'perfectionist/sort-interfaces': ['error'],
      'perfectionist/sort-imports': [
        'error',
        {
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
          customGroups: {
            value: {
              'my-internal': '^@/.+',
            },
            type: {
              'my-internal-type': '^@/.+',
            },
          },
        },
      ],
    },
    settings: {
      react: {
        version: 'detect',
      },
      vitest: {
        typecheck: true,
      },
    },
  }
);
