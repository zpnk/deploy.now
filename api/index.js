const app = require('express')()

app.get('/', (request, response) => {
  response.json({message: 'hello there'})
})

app.listen(3002, () => {
  console.log('API server ready on http://localhost:3002')
})
