/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
        
  animation: {
    fade: 'fadeIn 1s ease-in-out',
    fadeSlow: 'fadeIn 2s ease-in-out',
  },

  // that is actual animation
  keyframes: theme => ({
    fadeIn: {
      '0%': { opacity: 0 },
      '100%': { color: 1 },
    },
  }),
  plugins: [],
}
