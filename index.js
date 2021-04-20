const camelcase = require('camelcase');
const express = require('express')
const app = express()
const port = 8080

app.get('/', (req, res) => {
  res.send('Hello World and Bob!')
})

app.get('/test', (req, res) => {
  res.send('This is a test')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})