/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        base: '#0B0F14',
        surface: '#121822',
        'surface-alt': '#1A2230',
        line: '#232C3A',
        ink: '#E7ECF2',
        muted: '#7C8A9A',
        signal: {
          emerald: '#34D399',
          amber: '#F2B84B',
          rose: '#F2545B',
          indigo: '#6E8BFF',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'monospace'],
      },
      keyframes: {
        'signal-pulse': {
          '0%': { transform: 'scale(0.6)', opacity: '0.7' },
          '80%': { transform: 'scale(1.8)', opacity: '0' },
          '100%': { transform: 'scale(1.8)', opacity: '0' },
        },
        'otp-land': {
          '0%': { opacity: '0', transform: 'translateY(4px)', filter: 'blur(2px)' },
          '100%': { opacity: '1', transform: 'translateY(0)', filter: 'blur(0)' },
        },
      },
      animation: {
        'signal-pulse': 'signal-pulse 1.8s ease-out infinite',
        'otp-land': 'otp-land 0.4s ease-out',
      },
    },
  },
  plugins: [],
};
