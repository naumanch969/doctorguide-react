import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        "main-blue": "#140d46",
        "light-gray": "#9496A5",
        "blue-main": "#140D47",
        "dark-blue-main": "#140D33",
        "light-silver": "#EFF1F7",
        "hover-silver": "#e1e6f2",
        "lighter-blue": "#eef1f7",
        "lighter-gray": "#f7f7f7",
        "red": "#f3381b",
        "orange": "#F5B14A",
        "pink": "#ffeceb",
      },
      boxShadow: {
        'box': '-3px 0px 10px 3px #808080'
      }
    },
  },
  plugins: [],
}
export default config
