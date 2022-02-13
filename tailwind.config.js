module.exports = {
  darkMode: "class",
  separator: "_",
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      zIndex: {
        '100': '100',
        '200': '200',
        '300': '300',
        '400': '400',
        '500': '500',
      },
      minHeight: {
        '88vh': '88%',
      },
      maxHeight: {
        '88vh': '88%',
      },
      minWidth: {
        '280px': '280px',
      },
      transitionDuration: {
        '0': '0ms',
        '300': '300ms',
        '300ms': '300ms',
        '1000ms': '1000ms',
        '2000ms': '2000ms',
      },
      colors: {
        light: {
          50:  '#fdfdfd',
          100: '#fcfcfc',
          200: '#fafafa',
          300: '#f8f9fa',
          400: '#f6f6f6',
          500: '#f2f2f2',
          600: '#f1f3f5',
          700: '#e9ecef',
          800: '#dee2e6',
          900: '#dde1e3',
        },
        dark: {
          50: '#4a4a4a',
          100: '#3c3c3c',
          200: '#323232',
          300: '#2d2d2d',
          400: '#222222',
          500: '#1f1f1f',
          600: '#1c1c1e',
          700: '#1b1b1b',
          800: '#181818',
          900: '#0f0f0f',
        },
      },
    },
  },
  plugins: [
		require('@tailwindcss/forms'),
		require('@tailwindcss/typography'),
  ],
}
