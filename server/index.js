const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Bookworm server is up and running!')
})

app.listen(port, () => {
  console.log(`Bookworm server running on port ${port}`)
})
