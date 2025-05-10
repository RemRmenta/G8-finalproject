/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [],
  theme: {
    extend: {},
  },
  plugins: [],
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',      // for /app directory (Next.js 13+)
    './pages/**/*.{js,ts,jsx,tsx}',    // for /pages directory (optional if you're using /app)
    './components/**/*.{js,ts,jsx,tsx}', // for reusable components
    './src/**/*.{js,ts,jsx,tsx}',      // in case you're using /src directory
  ],
  theme: {
    extend: {
      // You can add custom colors, fonts, spacing, etc. here
    },
  },
};
