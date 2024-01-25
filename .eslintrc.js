module.exports = {
  env: {
    browser: true,
    es2021: true,
    "jest/globals": true,
  },
  plugins: [
    "css",
    "jest",
  ],
  extends: [
    "airbnb",
    "plugin:css/recommended",
    "plugin:react/jsx-runtime",
  ],
  overrides: [
    {
      env: {
        node: true,
      },
      files: [
        ".eslintrc.{js,cjs}",
      ],
      parserOptions: {
        sourceType: "script",
      },
    },
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: {
    "linebreak-style": ["error", "windows"],
    quotes: ["error", "double"],
    "lines-between-class-members": "off",
  },
};
