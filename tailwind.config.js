/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        background: 'var(--background)',
        primary: 'var(--primary)',
        secondary: 'var(--secondary)',
        contrast: 'var(--contrast)',
        'text-primary': 'var(--text-primary)',
        'text-secondary': 'var(--text-secondary)',
        'text-contrast': 'var(--text-contrast)',
        blue: 'var(--text-blue)',
        'blue-hover': 'var(--text-blue-hover)',
        hamburger: 'var(--hamburger-color)',
        'green-primary': 'var(--green-primary)',
        'red-primary': 'var(--red-primary)',
        'etherscan-logo-top': 'var(--etherscan-logo-top)',
        'etherscan-logo-bottom': 'var(--etherscan-logo-bottom)',
      },
      backgroundColor: {
        'red-opacity-20': 'rgba(239, 68, 68, 0.2)',
        'green-opacity-20': 'rgba(4, 120, 87, 0.2)',
      },
    },
  },
  plugins: [],
};
