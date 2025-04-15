import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        space: {
          primary: '#1a1a1a',    // Base metal color
          accent: '#00ffff',     // Hologram/neon color
          dark: '#0a192f',       // Dark blue accent
          metal: {
            light: '#2a2a2a',
            DEFAULT: '#1a1a1a',
            dark: '#0a0a0a'
          },
          neon: {
            cyan: '#00ffff',
            purple: '#ff00ff',
            blue: '#0066ff'
          },
          hologram: {
            base: '#00ffff',
            glow: '#00ffff80'
          }
        }
      },
      backgroundImage: {
        'gradient-space': 'linear-gradient(180deg, rgba(10, 25, 47, 0) 0%, rgba(10, 25, 47, 0.5) 100%)',
      },
    },
  },
  plugins: [],
}

export default config 