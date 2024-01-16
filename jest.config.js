module.exports = {
  clearMocks: true,
  preset: "ts-jest",
  testEnvironment: "node",
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.[jt]sx?$",
  setupFilesAfterEnv: ["<rootDir>/singleton.ts"],
};