module.exports = {
  root: true,
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@angular-eslint/recommended",
    "plugin:prettier/recommended"
  ],
  plugins: ["@angular-eslint", "prettier"],
  rules: {
    "prettier/prettier": "error"
  }
};
