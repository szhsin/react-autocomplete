/** @type {import('jest').Config} */
const config = {
  testEnvironment: 'jsdom',
  testMatch: ['**/*.test.[jt]s?(x)'],
  setupFilesAfterEnv: ['@testing-library/jest-dom', 'jest-dom-extended/jest'],
  clearMocks: true,
  collectCoverage: true
};

module.exports = config;
