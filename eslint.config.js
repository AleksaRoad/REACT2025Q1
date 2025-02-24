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
import eslintPluginUnicorn from 'eslint-plugin-unicorn';
import globals from 'globals';

export default tseslint.config(
  { ignores: ['dist', 'coverage'] },
  {
    extends: [
      eslintPluginUnicorn.configs.recommended,
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
      globals: { ...vitest.environments.env.globals, ...globals.builtin },
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
      '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
      'unicorn/no-array-callback-reference': 'off',
      'unicorn/no-array-for-each': 'off',
      'unicorn/no-array-reduce': 'off',
      'unicorn/no-null': 'off',
      'unicorn/number-literal-case': 'off',
      'unicorn/numeric-separators-style': 'off',
      'unicorn/prefer-node-remove': 'off',
      'unicorn/filename-case': 'off',
      'unicorn/prefer-query-selector': 'off',
      'unicorn/prefer-spread': 'off',
      'unicorn/prevent-abbreviations': [
        'error',
        {
          allowList: {
            acc: true,
            env: true,
            i: true,
            j: true,
            props: true,
            Props: true,
            Params: true,
            Ref: true,
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
