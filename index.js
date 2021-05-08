// const camelcase = require("camelcase");
const express = require("express");
const bodyParser = require("body-parser");
// const pug = require("pug");
const app = express();
const port = 3000;

// TODO: this is data from database
const liked = [
  { name: "Ben", imgSrc: "", content: "Woof", price: "$300" },
  { name: "Patricia", imgSrc: "", content: "Woof", price: "$300" },
  { name: "Bob", imgSrc: "", content: "Woof", price: "$300" },
];

// TODO: this is also data from database
var doggo = {
  name: "Karel",
  imgSrc: "",
  content: "Woof",
  breed: "insert breed",
  price: "$300",
  age: "3yr",
  gender: "./images/male.png",
  userId: 42,
};

//pug
app.use(express.static(__dirname + "/static/public/"));

// For parsing nested JSON objects
// see https://stackoverflow.com/questions/24330014/bodyparser-is-deprecated-express-4 and http://expressjs.com/en/resources/middleware/body-parser.html
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

app.set("view engine", "pug");

app.get("/", function (req, res) {
  res.render("welcome", {
    title: "Doggo app",
    message: "This is my matching app",
  });
});

//expresssssssssssssssssssss

// app.use(express.static('./static/public'))

// app.get('/', (req, res) => {
//   res.send('Hello World and Bob!')
// });

//routes

app.get("/home", (req, res) => {
  // FIXME: get doggo from database for user on request

  res.render("home", { title: "DoggoSwipe", doggo });
});

app.post("/matches/liked", (req, res) => {
  console.log(req.body);

  // TODO: get new doggo from database, put in 'liked' list for user
  liked.push(doggo);

  // TODO: remove when getting doggo from database works
  doggo = null;

  res.redirect("/home");
});

app.post("/matches/disliked", (req, res) => {
  console.log(req.body);

  // TODO: put in disliked list in database
  doggo = null;

  res.redirect("/home");
});

app.get("/matches", (req, res) => {
  res.render("matches", { title: "Doggo Matches", liked });
});

app.get("/welcome", (req, res) => {
  res.render("welcome", {
    user: { name: "visitor" },
  });
});

//adding an id
app.get("/test/:testId/:slug", (req, res) => {
  res.send(`<h1> this is page for ${req.params.slug}</h1>`);
});

//error handling
app.use((req, res, next) => {
  res.status(404).send("sorry can't find that!");
});

//connect
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
