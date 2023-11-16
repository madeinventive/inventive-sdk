/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testPathIgnorePatterns: [
    "/node_modules/",
    "/dist/",
  ],
  collectCoverageFrom: [
    'src/**',
    "!src/**/*.test.ts",
    "!src/**/*.itest.ts",
    '!src/__gen__/**',
    '!src/types/**',
    '!src/validatorUtils.ts'
  ],
};
