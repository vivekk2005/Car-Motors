/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Day mode colors
        day: {
          bg: '#F8F8F5',
          surface: '#FFFFFF',
          soft: '#E8E8E5',
          border: '#E2E2DF',
          text: '#171717',
          muted: '#6B7280',
          yellow: '#FFD400',
        },
        // Night mode colors
        night: {
          bg: '#080808',
          surface: '#121212',
          card: '#161616',
          graphite: '#1F1F1F',
          border: '#2A2A2A',
          text: '#F5F5F5',
          muted: '#9CA3AF',
          yellow: '#FFD400',
        },
        brand: {
          yellow: '#FFD400',
          yellowHover: '#E5BF00',
          yellowGlow: 'rgba(255, 212, 0, 0.35)',
          dark: '#080808',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Space Grotesk', 'Inter Display', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        'glow-yellow': '0 0 25px rgba(255, 212, 0, 0.35)',
        'glow-yellow-lg': '0 0 50px rgba(255, 212, 0, 0.45)',
        'glass-day': '0 8px 32px 0 rgba(0, 0, 0, 0.06)',
        'glass-night': '0 8px 32px 0 rgba(0, 0, 0, 0.4)',
      },
      animation: {
        'road-scroll': 'roadScroll 1.2s linear infinite',
        'pulse-subtle': 'pulseSubtle 2.5s ease-in-out infinite',
        'float': 'float 4s ease-in-out infinite',
      },
      keyframes: {
        roadScroll: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.85', transform: 'scale(1.03)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        }
      }
    },
  },
  plugins: [],
}
