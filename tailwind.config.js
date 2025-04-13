/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: 'hsl(var(--background))',
          dark: '#1A1625',
          light: '#4A5568'
        },
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: '#6B46C1',
          dark: '#553C9A',
          light: '#9F7AEA',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: '#ED64A6',
          dark: '#D53F8C',
          light: '#F687B3',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        success: {
          DEFAULT: '#4caf50',
          light: '#6bc06e',
          dark: '#3d8b40',
        },
        warning: {
          DEFAULT: '#ff9800',
          light: '#ffad33',
          dark: '#cc7a00',
        },
        error: {
          DEFAULT: '#f44336',
          light: '#f6685e',
          dark: '#d32f2f',
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-primary': 'linear-gradient(135deg, #2D3748 0%, #1A1625 100%)',
      },
      fontFamily: {
        sans: ['Inter var', 'Inter', 'sans-serif'],
        display: ['Clash Display', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
} 