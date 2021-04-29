const camelcase = require("camelcase");
const express = require("express");
const pug = require("pug");
const app = express();
const port = 3000;

const liked = [
  { name: "Ben", imgSrc: "", content: "Woof", price: "$300" },
  { name: "Patricia", imgSrc: "", content: "Woof", price: "$300" },
  { name: "Bob", imgSrc: "", content: "Woof", price: "$300" },
];

const doggoList = [
  {
    name: "Karel",
    imgSrc: "",
    breed: "insert breed",
    price: "$300",
    age: "3yr",
    gender: "./images/male.png",
  },
  {
    name: "Wim",
    imgSrc: "",
    breed: "insert breed",
    price: "$300",
    age: "3yr",
    gender: "./images/male.png",
  },
  {
    name: "Frans",
    imgSrc: "",
    breed: "insert breed",
    price: "$300",
    age: "3yr",
    gender: "./images/male.png",
  },
];

//pug
app.use(express.static(__dirname + "/static/public/"));

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
  res.render("home", { title: "DoggoSwipe", doggoList });
});

app.post("/home", (req, res) => {
  res.render("home", { title: "DoggoSwipe", doggoList });
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
