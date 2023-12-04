/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["*"],
  theme: {
    extend: {
      screens: {
        'android': '400px',
      },
      backgroundImage: {
        'manga': "url('/asset/2.jpg')",
        'komik': "url('/asset/4.jpg')",
      },
      width: {
        '128': '600px',
      },
      height: {
        '125': '500px',
        '123': '200px',
      },
      colors: {
        'blac-whi': '#272829',
      },
      fontFamily: {
        'yu-mincho': ['Yu Mincho'],
        'Tahoma'  : ['Tahoma'],
        'Poppins' : ['Poppins'],
      }
    },
  },
  plugins: [],
}

