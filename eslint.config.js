import js from '@eslint/js'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import eslintReact from 'eslint-plugin-react'
import eslintReactHooks from 'eslint-plugin-react-hooks'
import eslintReactRefresh from 'eslint-plugin-react-refresh'
import prettierPlugin from 'eslint-plugin-prettier'
import prettierConfig from 'eslint-config-prettier'

export default tseslint.config(
  {
    ignores: ['src/api/**', 'dist/'],
  },
  {
    languageOptions: {
      globals: { ...globals.browser, ...globals.node, ...globals.es2024 },
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    plugins: {
      react: eslintReact,
      'react-hooks': eslintReactHooks,
      'react-refresh': eslintReactRefresh,
      prettier: prettierPlugin,
    },
  },
  js.configs.recommended,
  ...tseslint.configs.strict,
  prettierConfig,
  {
    files: ['src/**/*.{ts,tsx,json}'],
    rules: {
      ...eslintReact.configs.recommended.rules,
      ...eslintReactHooks.configs.recommended.rules,
      'prettier/prettier': 'error',
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-expressions': 'warn',
      '@typescript-eslint/ban-ts-comment': [
        'error',
        {
          'ts-expect-error': 'allow-with-description',
        },
      ],
      '@typescript-eslint/consistent-type-imports': [
        'error',
        {
          prefer: 'type-imports',
        },
      ],
      'react/react-in-jsx-scope': 'off',
      'react/self-closing-comp': [
        'error',
        {
          component: true,
          html: true,
        },
      ],
      'react/jsx-no-leaked-render': [
        'error',
        {
          validStrategies: ['ternary', 'coerce'],
        },
      ],
      'react/jsx-boolean-value': ['error', 'always'],
      'react-hooks/rules-of-hooks': 'error',
      'react-refresh/only-export-components': 'warn',
      'arrow-body-style': ['error', 'as-needed'],
      'no-debugger': 'warn',
      'no-console': [
        'warn',
        {
          allow: ['clear', 'info', 'error', 'trace'],
        },
      ],
    },
  },
)
