const server = require('express')()
const next = require('./lib/next')
const api = require('./api')

const SERVER_PORT = 3000
const NEXT_PORT = 3001

server.use('/api', api)
server.use('*', next.proxy(NEXT_PORT))

async function start() {
  try {
    await next.start(NEXT_PORT)
    await server.listen(SERVER_PORT)
    console.log(`> Ready on http://localhost:${SERVER_PORT}`)
  } catch(error) {
    console.error(err)
    process.exit(1)
  }
}

start()
