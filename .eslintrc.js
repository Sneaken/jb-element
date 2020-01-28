module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ["plugin:vue/essential", "@vue/prettier", "@vue/typescript"],
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    'no-var': 'error',
    'prefer-const': 'error',
    camelcase: ['error', { ignoreDestructuring: true, properties: 'never' }],
    "prettier/prettier": "error"
  },
  parserOptions: {
    parser: "@typescript-eslint/parser"
  },
};
