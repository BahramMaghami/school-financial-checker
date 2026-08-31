const config = {
  plugins: {
    '@tailwindcss/postcss': {
      theme: {
        extend: {
          fontFamily: {
            sans: ['var(--font-iransans)', 'sans-serif'],
          },
        },
      },
    },
  },
}

export default config
