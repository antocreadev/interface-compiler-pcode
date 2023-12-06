import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src//app/components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      minWidth: {
        '1/4': '25%',
        '2/4': '50%',
        '3/4': '75%',
      },
      maxWidth: {
        '1/4': '25%',
        '2/4': '50%',
        '3/4': '75%',
      },

      minHeight: {
        '1/4': '25%',
        '2/4': '50%',
        '3/4': '75%',
      },
      maxHeight: {
        '1/4': '25%',
        '2/4': '50%',
        '3/4': '75%',
      },


      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [require("daisyui")],
}
export default config
