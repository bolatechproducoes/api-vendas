/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  //clearMocks: true,
  //collectCoverage: true,
  //collectCoverageFrom: ['<rootDir>/src/modules/**/services/*.ts'],
  //coverageDirectory: 'coverage',
  //coverageProvider: 'v8',
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/*.spec.ts'],
};
