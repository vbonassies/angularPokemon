module.exports = {
    "transform": {
        "^.+\\.tsx?$": "ts-jest"
    },
    "testPathIgnorePatterns": [
        "/node_modules/",
        "/src/environments/"
    ],
    "moduleNameMapper": {
        'environments/(.*)$': '<rootDir>/src/environments/environment.test.ts',
    },
    "coverageReporters": ['html'],
    "coverageDirectory": "./jest-coverage",
    "collectCoverageFrom": [
        "./src/app/**/*.ts",
        "!./src/**/*.test.ts",
    ]
};
