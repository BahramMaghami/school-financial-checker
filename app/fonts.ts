import localFont from 'next/font/local'

export const iranSans = localFont({
  src: [
    {
      path: '../public/fonts/Dirooz.woff2',
      weight: '400',
      style: 'normal',
    },
  ],
  variable: '--font-iransans',
  display: 'swap',
})
