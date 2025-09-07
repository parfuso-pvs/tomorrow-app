import type { Config } from 'tailwindcss'
import sharedConfig from '@tomorrow/config/tailwind/tailwind.config'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    '../../packages/ui/src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  presets: [sharedConfig],
  theme: {
    extend: {
      colors: {
        // Tomorrow App specific colors will be added here
      },
    },
  },
  plugins: [],
}

export default config