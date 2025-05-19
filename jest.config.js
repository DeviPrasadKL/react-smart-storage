module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-jsdom',
  testMatch: ['**/?(*.)+(test).[jt]s?(x)'] // Match test.ts, test.js, test.tsx, etc.
};
