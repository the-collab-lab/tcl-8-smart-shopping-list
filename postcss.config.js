// postcss is required for linting
// and using autoprefixer to see which
// css properties need to be prefixed

const tailwindcss = require('tailwindcss');
module.exports = {
  plugins: [tailwindcss('./tailwind.js'), require('autoprefixer')],
};
