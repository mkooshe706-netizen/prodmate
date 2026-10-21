/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        'inter-regular': ['Inter_400Regular'],
        'inter-semibold': ['Inter_600SemiBold'],
        'inter-bold': ['Inter_700Bold'],
      },
      colors: {
        primary: {
          50: '#eef2ff',
          100: '#e0e7ff',
          500: '#6366f1',
          600: '#4F46E5',
          700: '#4338ca',
          900: '#312e81',
        },
        surface: {
          light: '#FFFFFF',
          dark: '#111827',
          muted: '#F9FAFB',
        },
        border: {
          light: '#F3F4F6',
          dark: '#374151',
        },
      },
    },
  },
  plugins: [],
};