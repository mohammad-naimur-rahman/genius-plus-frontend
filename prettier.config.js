/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').PluginOptions} */
const config = {
  singleQuote: true,
  semi: false,
  arrowParens: 'avoid',
  trailingComma: 'none',
  jsxSingleQuote: true,
  bracketSpacing: true,
  tabWidth: 2,
  endOfLine: 'auto',
  plugins: ['prettier-plugin-tailwindcss'],
  printWidth: 120
}

export default config
