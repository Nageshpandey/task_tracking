/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        fontFamily: {
          futura: ['"futura-lt-w01-light"', '"futura-lt-w05-light"', 'sans-serif'],
          quicksand: ['Quicksand', 'sans-serif'],
          poppins: ['Poppins', 'sans-serif'],
  
  
        },
        
        borderWidth: {
          '4': '4px', // Adds 3px border utility
        },
      },
    },
    plugins: [],
  }
  
  