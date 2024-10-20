/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui"
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      flex: {
        '1': '1',
        '2': '2',
        '3': '3',
        '4': '4',
        '5': '5',
        '6': '6',
        '7': '7',
        '8': '8',
        '9': '9',
        '10': '10',
        '11': '11',
        '12': '12'
      },
      colors: {
        primary: '#f0f0f0',
        secondary: '#016A70',
        neutral: '#3a3a3a',
        greenLight: '#D8EFD3',
        teal: '#009FBD',
        extraTeal: '#006989',
        gold: '#FFB200',
        clr: '#BBE2EC',
        navyBlue: '#002147',
        royalBlue: '#4169e1',
        Cyan: '#00bcd4'
      },
      fontSize: {
        '5.5xl': '3.25rem',
      }
    },
  },
  plugins: [
    daisyui,
  ],
}