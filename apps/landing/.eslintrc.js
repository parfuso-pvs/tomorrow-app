module.exports = {
  root: true,
  extends: ['@tomorrow/config/eslint/next.js'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
  },
}