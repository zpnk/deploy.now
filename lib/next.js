const Next = require('next/dist/server').default
const proxy = require('http-proxy-middleware')
const path = require('path')

const isProd = process.env.NODE_ENV === 'production'

const nextOpts = {dir: '.'}
if (!isProd) nextOpts.dev = true
if (!isProd) nextOpts.hotReload = true

const next = new Next(nextOpts)

next.proxy = (port=3001) => proxy({
  target: `http://localhost:${port}`,
  logLevel: 'silent',
  onError: (error, request, response) => {
    const errorPage = path.resolve('./static/500.html')
    return response.status(500).sendFile(errorPage)
  }
})

module.exports = next
