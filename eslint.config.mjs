// @ts-check
import { defineConfig } from 'eslint/config';
import eslint from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-config-prettier';
import jest from 'eslint-plugin-jest';
import reactHooks from 'eslint-plugin-react-hooks';
import reactHooksAddons from 'eslint-plugin-react-hooks-addons';

export default defineConfig(
  eslint.configs.recommended,
  tseslint.configs.recommendedTypeChecked,
  prettier,
  jest.configs['flat/recommended'],
  jest.configs['flat/style'],
  reactHooksAddons.configs.recommended,
  {
    files: ['**/*.?(c|m)js'],
    ...tseslint.configs.disableTypeChecked
  },
  {
    ignores: [
      'features/',
      'types/',
      '**/examples/',
      '**/coverage/',
      '**/dist/',
      '**/build/',
      '**/static/',
      '**/.docusaurus/'
    ]
  },
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: {
        projectService: {
          allowDefaultProject: ['*.?(c|m)[jt]s']
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
      // @ts-ignore
      'react-hooks': reactHooks
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
  }
);
