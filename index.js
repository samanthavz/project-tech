const camelcase = require('camelcase');
const express = require('express')
const app = express()
const port = 8080

app.use(express.static('./static/public'))

app.get('/', (req, res) => {
  res.send('Hello World and Bob!')
});

app.get('/test', (req, res) => {
  res.send('This is a test')
});

//adding an id
app.get('/test/:testId/:slug', (req, res) => {
  res.send(`<h1> this is page for ${req.params.slug}</h1>`)
});

app.use(function (req, res, next) {
  res.status(404).send("sorry can't find that!")
});


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})