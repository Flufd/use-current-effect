module.exports = {
  roots: ["<rootDir>/src"],
  globals: {
    'ts-jest': {
      tsConfig: 'tsconfig.json'
    }
  },
  transform: {
    "^.+\\.tsx?$": "ts-jest"
  }
};
