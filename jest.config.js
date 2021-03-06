module.exports = {
  roots: ["<rootDir>/src"],
  globals: {
    'ts-jest': {
      tsConfig: 'tsconfig.jest.json'
    }
  },
  transform: {
    "^.+\\.tsx?$": "ts-jest"
  }
};
