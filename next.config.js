/** @type {import('next').NextConfig} */

const withPWA = require('next-pwa')
const runtimeCaching = require('next-pwa/cache')

const isProd = process.env.NODE_ENV === 'production'

const nextConfig = {
  reactStrictMode: true,
  assetPrefix: isProd ? '/sos-petropolis/' : '',
}

module.exports = withPWA({
  pwa: {
    dest: 'public',
    runtimeCaching,
  },
  reactStrictMode: true,
  assetPrefix: isProd ? '/sos-petropolis/' : '',
})
