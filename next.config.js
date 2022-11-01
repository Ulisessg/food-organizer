/** @type {import('next').NextConfig} */
const nextConfig = {
  // eslint-disable-next-line require-await, space-before-function-paren
  async headers() {
    return [
      {
        headers: [
          {
            key: 'Content-Type',
            value: 'application/json'
          }
        ],
        source: '/api/:slug*'
      }
    ]
  },
  reactStrictMode: true,
  swcMinify: true
}

module.exports = nextConfig
