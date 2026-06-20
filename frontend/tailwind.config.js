/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        base: '#FFFFFF',
        surface: '#FFFFFF',
        'surface-alt': '#F6F7F8',
        'surface-sunken': '#F0F1F3',
        line: '#E3E5E8',
        'line-strong': '#D0D3D8',
        ink: '#1A1D21',
        muted: '#6B7280',
        'muted-2': '#9AA1AB',
        accent: {
          DEFAULT: '#1F2937',
          hover: '#111827',
        },
        link: '#2563EB',
        signal: {
          emerald: '#15803D',
          'emerald-bg': '#F0FDF4',
          amber: '#B45309',
          'amber-bg': '#FFFBEB',
          rose: '#B91C1C',
          'rose-bg': '#FEF2F2',
          slate: '#6B7280',
          'slate-bg': '#F6F7F8',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        sm: '0 1px 2px 0 rgba(16, 24, 40, 0.04)',
        dropdown: '0 4px 12px rgba(16, 24, 40, 0.10)',
      },
    },
  },
  plugins: [],
};
