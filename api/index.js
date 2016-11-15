const api = require('express')()
const bodyParser = require('body-parser')
const deploy = require('../lib/deploy')

api.use(bodyParser.json())

api.post('/deploy', async (request, response) => {
  try {
    const {repo, zeitToken, envs} = request.body

    const url = await deploy(repo, zeitToken, envs)

    response.json({url})
  } catch(error) {
    response.status(500).json({
      error: JSON.stringify(error.message)
    })
  }
})

api.listen(3002, () => {
  console.log('API server ready on http://localhost:3002')
})
