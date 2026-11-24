/** @type {import('tailwindcss').Config} */

// Colours live as RGB channels in src/index.css (:root) so they can be
// changed in one place and still support Tailwind opacity modifiers (text-ink/60).
const token = (name) => `rgb(var(--${name}) / <alpha-value>)`;

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Bebas Neue"', 'sans-serif'],
        poster: ['"Archivo Black"', 'sans-serif'],
        sans: ['"Space Grotesk"', 'sans-serif'],
      },
      colors: {
        cream: token('cream'),
        ink: token('ink'),
        warm: token('gold'),
        muted: token('muted'),
        proj: {
          blue: token('proj-blue'),
          tan: token('proj-tan'),
          green: token('proj-green'),
          red: token('proj-red'),
          sky: token('proj-sky'),
        }
      },
      transitionTimingFunction: {
        editorial: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
}
