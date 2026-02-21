/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: ['./pages/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#2F80ED',
        'primary-hover': '#1C63D9',

        purple: '#8785FF',
        'purple-hover': '#695BF9',

        yellow: '#F8B76B',
        'yellow-hover': '#F59842',

        red: '#EB5757',

        gray1: '#333333',
        gray2: '#4F4F4F',
        gray3: '#828282',
        gray4: '#BDBDBD',
        gray5: '#E0E0E0',
        gray6: '#F2F2F2',

        gray7: '#C4C4C4',
        gray8: '#F8F8F8'
      }
    }
  },
  plugins: [require('tailwindcss-animate')]
}
