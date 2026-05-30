export default {
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.[jt]sx?$": "babel-jest",
  },
  collectCoverageFrom: [
    "src/utils/bookRecordMapper.js",
    "src/utils/bookStorage.js",
    "src/utils/localStorage.js",
    "src/utils/createId.js",
    "src/constants/storageKey.js"
  ],
};
