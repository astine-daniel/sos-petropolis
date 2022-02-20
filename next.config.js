/** @type {import('next').NextConfig} */

const isProd = process.env.NODE_ENV === 'production'
const withPlugins = require('next-compose-plugins')
const offline = require('next-offline')

const nextConfig = {
  reactStrictMode: true,
  assetPrefix: isProd ? '/sos-petropolis/' : '',
}

module.exports = withPlugins([[offline]], nextConfig)
