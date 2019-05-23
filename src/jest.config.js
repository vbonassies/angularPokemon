module.exports = {
    "transform": {
        "^.+\\.tsx?$": "ts-jest"
    },
    "testPathIgnorePatterns": [
        "/node_modules/",
        "/src/environments/"
    ],
    "moduleNameMapper": {
        'environments/(.*)$': '<rootDir>/environments/environment.test.ts',
    },
    "coverageReporters": ['html'],
    "coverageDirectory": "./jest-coverage",
    "collectCoverageFrom": [
        "./src/**/*.ts",
        "!./src/**/*.test.ts",
    ]
};
