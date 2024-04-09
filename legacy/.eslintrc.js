module.exports = {
  globals: {
    window: true,
    document: true,
  },
  env: {
    browser: true,
    es6: true,
    jquery: true,
  },
  extends: "eslint:recommended",
  parserOptions: {
    ecmaVersion: 2016,
  },
  rules: {
    indent: ["error", 2],
    "linebreak-style": ["off", "windows"], // Mac and Windows use different styles. So ignore it.
    quotes: ["error", "double"],
    semi: ["error", "always"],
    "no-console": "off",
  },
};
