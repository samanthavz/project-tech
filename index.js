// const camelcase = require("camelcase");
const express = require("express");
const dotenv = require("dotenv");
// const pug = require("pug");
const { MongoClient } = require("mongodb");
const app = express();
const port = 3000;

// see https://www.npmjs.com/package/dotenv
dotenv.config();

// see https://docs.mongodb.com/drivers/node/current/quick-start/
const client = new MongoClient(process.env.DB_CONNECT, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

client
  .connect()
  .then(() => {
    console.info("[MONGO DB] database connected!");
  })
  .catch((error) => {
    console.error("[MONGO DB] error: " + error.message);
  });

// TODO: this is data from database
const liked = [
  {
    name: "Ben",
    imgSrc: "./images/dogPic.jpg",
    content: "Woof",
    price: "$300",
  },
  {
    name: "Patricia",
    imgSrc: "./images/dogPic.jpg",
    content: "Woof",
    price: "$300",
  },
  {
    name: "Bob",
    imgSrc: "./images/dogPic.jpg",
    content: "Woof",
    price: "$300",
  },
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
// see https://medium.com/@mmajdanski/express-body-parser-and-why-may-not-need-it-335803cd048c
app.use(express.urlencoded({ extended: true })); //Parse URL-encoded bodies
app.use(express.json());

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

//form
app.post("/matches/liked", (req, res) => {
  console.log(req.body);

  // TODO: get new doggo from database, put in 'liked' list for user
  liked.push(doggo);

  // TODO: remove when getting doggo from database works and instead push new doggo from database
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
