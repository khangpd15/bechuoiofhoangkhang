/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#FFFDF5',
          100: '#FEF9E3',
          200: '#FDF0BD',
          300: '#FBE48E',
          400: '#F8D45A',
          500: '#F4C542', // Vàng chuối đặc trưng
          600: '#DCAB27',
          700: '#B88A16',
          800: '#8C6713',
          DEFAULT: '#F4C542',
        },
        secondary: {
          50: '#F6FCF0',
          100: '#ECF9DC',
          200: '#DAF2B6',
          300: '#C3EB8B',
          400: '#A8D96C', // Xanh lá non
          500: '#8CC44D',
          600: '#6FA334',
          700: '#558027',
          DEFAULT: '#A8D96C',
        },
        leaf: {
          light: '#5BAA55',
          DEFAULT: '#3F8A3A', // Xanh lá đậm logo
          dark: '#286324',
        },
        cream: {
          50: '#FFFFFF',
          DEFAULT: '#FDFAEB', // Nền kem nhạt ấm áp
          200: '#FAF2D3',
          300: '#F4E7B4',
        },
        brown: {
          light: '#855E39',
          DEFAULT: '#5A3A1A', // Nâu đậm chi tiết logo
          dark: '#3D250E',
        },
        blush: {
          light: '#FFAFA0',
          DEFAULT: '#FF8E72', // Má hồng quả chuối nháy mắt
          dark: '#E86D50',
        },
      },
      fontFamily: {
        display: ['"Baloo 2"', 'cursive', 'sans-serif'],
        body: ['"Nunito"', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '1.25rem',
        '3xl': '1.75rem',
        '4xl': '2.5rem',
      },
      boxShadow: {
        'soft': '0 10px 30px -5px rgba(90, 58, 26, 0.08)',
        'banana': '0 14px 30px -6px rgba(244, 197, 66, 0.38)',
        'leaf': '0 12px 26px -6px rgba(63, 138, 58, 0.3)',
        'card': '0 6px 24px -2px rgba(90, 58, 26, 0.07)',
        'pop': '0 20px 40px -8px rgba(90, 58, 26, 0.14)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-10px) rotate(2deg)' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.88', transform: 'scale(1.03)' },
        },
      },
      animation: {
        float: 'float 3.5s ease-in-out infinite',
        wiggle: 'wiggle 2s ease-in-out infinite',
        pulseSoft: 'pulseSoft 2.5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
