import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      animation: {
        blob: "blob 7s infinite"
      },
      keyframes: {
        blob: {
          "0%": {
            transform: "translate(0px, 0px) scale(1)"
          },
          "35%": {
            transform: "translate(30px, -50px) scale(1.1)"
          },
          "65%": {
            transform: "translate(-20px, 20px) scale(0.9)"
          },
          "100%": {
            transform: "translate(0px, 0px) scale(1)"
          },
        }
      },

      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        'custom-green': '#50AC88',
        'custom-purple': '#602BF8',
        'hover-green': '#20805b',
        'graph-temperature': '#82ca9d',
        'graph-spoilage': '#413ea0',
        'placeholder-grey': '#CBCFD8'
      },
      fontFamily: {
        'sans': ['Work Sans'],
      },
      fontWeight: {
        'semi-bold': '600',
        'boldie': '500',
        'light': '300',
        'regular': '400'
      },
    },
  },
  plugins: [],
}
export default config
