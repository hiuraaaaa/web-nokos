/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        surface: '#FFFFFF',
        'surface-alt': '#F4F6F9',
        'surface-sunken': '#EEF1F5',
        line: '#E2E6EC',
        'line-strong': '#CDD3DC',
        ink: '#0F172A',
        muted: '#64748B',
        'muted-2': '#94A3B8',

        // Sidebar navy
        nav: {
          bg: '#0F172A',
          hover: '#1E293B',
          active: '#1E3A5F',
          text: '#CBD5E1',
          'text-active': '#FFFFFF',
          border: '#1E293B',
        },

        // Primary accent — sky blue
        accent: {
          DEFAULT: '#0EA5E9',
          hover: '#0284C7',
          light: '#E0F2FE',
          text: '#0369A1',
        },

        // Status signals
        signal: {
          emerald: '#15803D',
          'emerald-bg': '#F0FDF4',
          amber: '#B45309',
          'amber-bg': '#FFFBEB',
          rose: '#B91C1C',
          'rose-bg': '#FEF2F2',
          slate: '#64748B',
          'slate-bg': '#F4F6F9',
        },

        link: '#0EA5E9',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        sm: '0 1px 2px 0 rgba(15, 23, 42, 0.06)',
        card: '0 1px 3px rgba(15, 23, 42, 0.08)',
        dropdown: '0 4px 12px rgba(15, 23, 42, 0.12)',
      },
    },
  },
  plugins: [],
};
