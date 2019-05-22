module.exports = {
  "roots": [
    "<rootDir>/src"
  ],
  "transform": {
    "^.+\\.tsx?$": "ts-jest"
  },
  "coverageReporters": [ 'html' ],
  "coverageDirectory" : "./jest-coverage",
  "collectCoverageFrom": ["./src/**/*.ts", "!./src/**/*.test.ts"]
}