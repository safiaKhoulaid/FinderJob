/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  // Safelist pour classes utilisées dynamiquement dans les bindings Angular
  safelist: [
    'bg-green-500',
    'bg-red-500',
    'animate-slide-in',
    'w-6',
    'h-6',
    'fixed',
    'top-5',
    'right-5',
    'z-50',
    'px-6',
    'py-4',
    'rounded-lg',
    'shadow-lg',
    'text-white'
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
