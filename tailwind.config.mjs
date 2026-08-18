import defaultTheme from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}', // includes components and pages
    './public/index.html',        // in case you have static HTML
    './src/app/globals.css',      // ensures your global styles are parsed
  ],
  theme: {
    extend: {
      fontFamily: {
        title: ['Major Mono Display', 'Montserrat Subrayada', 'Fjalla One', 'sans-serif'],
        header: ['Montserrat Subrayada', 'Fjalla One', 'sans-serif'],
        rale: ['Raleway', 'sans-serif'],
        orbitron: 'var(--font-orbitron)',
        'space-grotesk': 'var(--font-space-grotesk)',
        dm: 'var(--font-dm-sans)',

      },
      gridTemplateColumns: {
        '25': 'repeat(25, 1fr)',
      },
    },
  },
  plugins: [],
  important: true,
};

export default config;