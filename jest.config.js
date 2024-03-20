// eslint-disable-next-line @typescript-eslint/no-var-requires
const { pathsToModuleNameMapper } = require('ts-jest')

/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['./'],
  modulePaths: ['./'],
  moduleNameMapper: pathsToModuleNameMapper({
    '@/*': ['src/*']
  }),
  verbose: true,
  collectCoverage: true,
  collectCoverageFrom: [
    'src/*.ts',
    'src/**/*.ts',
    '!dist'
  ],
  coverageThreshold: {
    global: {
      lines: 80,
      statements: 80,
      branches: 80,
      functions: 80
    }
  }
}
