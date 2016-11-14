const url = require('url')
const server = require('express')()
const proxy = require('http-proxy').createProxyServer()

server.all('/api/?*', (request, response) => {
  const {pathname, search} = url.parse(request.url)
  const newPath = pathname.replace('/api', '')
  const target = `http://localhost:3002${newPath}${search || ''}`
  proxy.web(request, response, {target, ignorePath: true})
})

server.all('*', (request, response) => {
  const {pathname, search} = url.parse(request.url)
  const target = `http://localhost:3001${pathname}${search || ''}`
  proxy.web(request, response, {target, ignorePath: true})
})

server.listen(3000, () => {
  console.log('Proxy server ready on http://localhost:3000')
})
