/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [

    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        '20': 'repeat(20, minmax(0, 1fr))',
      },
      zIndex: {
        '-10': '-10',
      }
    },
  },
  plugins: [
    require('tailwindcss'),
    require('autoprefixer'),

  ],
}

