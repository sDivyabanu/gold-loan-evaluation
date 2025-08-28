import type { Config } from 'tailwindcss'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: "#FFD700",      // bright gold
        darkgold: "#B8860B",  // darker gold
        graycustom: "#F5F5F5", // safe light gray
        blackcustom: "#000000", // black
      }
    },
  },
  plugins: [],
} satisfies Config
