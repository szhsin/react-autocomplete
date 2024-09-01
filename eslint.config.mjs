// @ts-check

import eslint from '@eslint/js';
import { fixupPluginRules } from '@eslint/compat';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-config-prettier';
import jest from 'eslint-plugin-jest';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactHooksAddons from 'eslint-plugin-react-hooks-addons';

export default tseslint.config(
  eslint.configs.recommended,
  prettier,
  jest.configs['flat/recommended'],
  jest.configs['flat/style'],
  react.configs.flat.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  {
    files: ['**/*.js', '**/*.mjs'],
    ...tseslint.configs.disableTypeChecked
  },
  {
    ignores: [
      '**/examples/',
      '**/coverage/',
      '**/dist/',
      '**/types/',
      '**/build/',
      '**/static/'
    ]
  },
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: {
        projectService: {
          allowDefaultProject: ['*.js', '*.mjs']
        },
        tsconfigRootDir: import.meta.dirname,
        ecmaFeatures: {
          jsx: true
        }
      },
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.jest
      }
    },
    plugins: {
      jest,
      react,
      // @ts-ignore
      ['react-hooks']: fixupPluginRules(reactHooks),
      ['react-hooks-addons']: fixupPluginRules(reactHooksAddons)
    },
    settings: {
      react: {
        version: 'detect'
      }
    },
    rules: {
      'no-console': ['error', { allow: ['warn', 'error'] }],
      'jest/expect-expect': 0,
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'error',
      'react-hooks-addons/no-unused-deps': 'error',
      '@typescript-eslint/ban-ts-comment': 0,
      '@typescript-eslint/no-unused-expressions': [
        'error',
        { allowShortCircuit: true, allowTernary: true }
      ],
      '@typescript-eslint/no-misused-promises': [
        'error',
        {
          checksVoidReturn: false
        }
      ]
    }
  },
  {
    files: ['src/__tests__/**/*'],
    rules: {
      'react/react-in-jsx-scope': 0
    }
  }
);
