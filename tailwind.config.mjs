/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // ServerPro brand — premium industrial accent, not tied to the brand name
        navy: {
          DEFAULT: '#0E1B2C',
          50: '#F4F6FA',
          100: '#E5EAF2',
          200: '#C4CEDD',
          300: '#94A4BD',
          400: '#5C7195',
          500: '#374C70',
          600: '#243553',
          700: '#162338',
          800: '#0E1B2C',
          900: '#070D17',
        },
        gold: {
          DEFAULT: '#D4A24C',
          50: '#FBF6EB',
          100: '#F5E9CC',
          200: '#EAD198',
          300: '#DEB868',
          400: '#D4A24C',
          500: '#B7873A',
          600: '#8E6627',
          700: '#65491A',
        },
        cream: '#FAF7F2',
        ink: {
          DEFAULT: '#0F172A',
          muted: '#5B6478',
          subtle: '#94A0B5',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Manrope', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        // refined display scale
        'display-xl': ['clamp(3rem, 7vw, 5.25rem)', { lineHeight: '1.05', letterSpacing: '-0.03em', fontWeight: '600' }],
        'display-lg': ['clamp(2.25rem, 5vw, 3.75rem)', { lineHeight: '1.08', letterSpacing: '-0.025em', fontWeight: '600' }],
        'display-md': ['clamp(1.875rem, 3.5vw, 2.5rem)', { lineHeight: '1.15', letterSpacing: '-0.02em', fontWeight: '600' }],
      },
      maxWidth: {
        container: '1240px',
        prose: '68ch',
      },
      boxShadow: {
        soft: '0 1px 2px rgba(14, 27, 44, 0.04), 0 4px 12px rgba(14, 27, 44, 0.04)',
        lift: '0 4px 12px rgba(14, 27, 44, 0.06), 0 16px 40px rgba(14, 27, 44, 0.08)',
        glow: '0 0 0 1px rgba(212, 162, 76, 0.4), 0 8px 24px rgba(212, 162, 76, 0.2)',
      },
      borderRadius: {
        'xl2': '1.25rem',
      },
      transitionTimingFunction: {
        'out-soft': 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
};
