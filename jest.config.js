const nextJest = require('next/jest')

const createJestConfig = nextJest({
  dir: './src'
})

/** @type {import('jest').Config} */
const customJestConfig = {
  moduleDirectories: [
    'node_modules',
    'src'
  ],
  moduleNameMapper: {
    // Handle module aliases (this will be automatically configured for you soon)
    '^@/components/(.*)$': '<rootDir>/components/$1',

    '^@/pages/(.*)$': '<rootDir>/pages/$1'
  },
  modulePaths: ['<rootDir>'],
  rootDir: './',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom'
}

module.exports = createJestConfig(customJestConfig)
