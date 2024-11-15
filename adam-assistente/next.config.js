module.exports = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://seu-ip-local:3000/:path*'
      }
    ]
  }
}
