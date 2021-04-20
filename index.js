const camelcase = require('camelcase');
const express = require('express');
const pug = require('pug');
const app = express()
const port = 3000

//pug

app.set('view engine', 'pug');

app.get('/', function (req, res) {
  res.render('index', { title: 'Doggo app', message: 'This is my matching app' })
})


//expresssssssssssssssssssss

// app.use(express.static('./static/public'))

// app.get('/', (req, res) => {
//   res.send('Hello World and Bob!')
// });

//routes

app.get('/home', (req, res) => {
  res.render('home', { title: 'Doggo app', message: 'This is my home page' })
});

app.get('/list', (req, res) => {
  res.render('index', { title: 'Doggo app', message: 'This is a list page for like doggos' })
});


//adding an id
app.get('/test/:testId/:slug', (req, res) => {
  res.send(`<h1> this is page for ${req.params.slug}</h1>`)
});


//error handling
app.use(function (req, res, next) {
  res.status(404).send("sorry can't find that!")
});

//connect
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});


