/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        body: ['"DM Sans"', 'sans-serif'],
        mono: ['"Space Mono"', 'monospace'],
      },
      colors: {
        bone:   '#f5f0e8',
        ink:    '#0e0c09',
        rust:   '#b94c2e',
        sand:   '#c8b89a',
        muted:  '#7a7265',
      },
    },
  },
  plugins: [],
}
