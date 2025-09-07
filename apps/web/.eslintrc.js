module.exports = {
  extends: ['@tomorrow/config/eslint/next.js'],
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
  },
}