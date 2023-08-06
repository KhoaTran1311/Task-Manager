/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    borderWidth: {
      DEFAULT: '1px',
      'small': '0.5px',
      '2': '2px',
      '3': '3px',
      '4': '4px',
      '6': '6px',
      '8': '8px',
    },
    backgroundOpacity: {
      '10': '0.1',
      '20': '0.2',
      '50': '0.5',
      '60': '0.6',
      '70': '0.7',
      '80': '0.8',
      '85': '0.85',
      '90':'0.9',
      '95': '0.95',
      'high': '0.97'
    },
    width: {
      '1/3': '30%',
      '9/10': '90%',
      '1/10': '10%',
      '7/10': '70%',
      'full': '100%',
      '4': '16px',
      '5': '20px',
      '6': '24px',
      '10': '40px',
      'high': '700px',
      'start':'60.969px',
      'fit': 'fit-content',

    },
    backdropBlur: {
      xs: '2px',
      sm: '7px',
      lg: '11px'
    },
  },
  plugins: [],
}

