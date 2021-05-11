// const camelcase = require("camelcase");
const express = require("express");
const dotenv = require("dotenv");
// const pug = require("pug");
const { MongoClient } = require("mongodb");
// const mongo = require("mongodb").MongoClient;
const app = express();
const port = 3000;

// see https://www.npmjs.com/package/dotenv
dotenv.config();

//arrays
let liked = [];
let doggoList = [];

let profile = {
  name: "Samantha",
  lastname: "van Zandwijk",
  age: "19",
  likedDoggos: [],
  dislikedDoggos: [],
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

const client = new MongoClient(process.env.DB_CONNECT, {
  retryWrites: true,
  useUnifiedTopology: true,
});

// Mind you that this is now an async function.
app.get("/home", async (req, res) => {
  doggoList = [];

  try {
    // We wait here till the client is connected
    await client.connect();

    // We want to connect to the "DoggoSwipe" database
    const database = client.db("DoggoSwipe");
    // We want to connect to the "doggos" collection in the "DoggoSwipe" database
    const collection = database.collection("Doggos");

    const cursor = await collection.find({});
    await cursor.forEach((doc) => {
      let isInLiked = false;
      profile.likedDoggos.forEach(function (dog) {
        if (doc.userId === dog.userId) {
          isInLiked = true;
        }
      });
      profile.dislikedDoggos.forEach(function (dog) {
        if (doc.userId === dog.userId) {
          isInLiked = true;
        }
      });

      if (!isInLiked) {
        doggoList.push(doc);
      }

    });
  } catch (error) {
    console.log(error);
  } finally {
    res.render("home", { title: "DoggoSwipe", doggo: doggoList[0] });
  }
});

//form

//TODO: Maak een GET post aan waarbij je users uit de database haalt en filtert dmv jouw profiel

app.post("/matches/liked", (req, res) => {
  console.log(req.body);

  // TODO: get new doggo from database, put in 'liked' list for user
  liked.push(doggoList[0]);
  profile.likedDoggos.push(doggoList[0]);

  // TODO: remove when getting doggo from database works and instead filter database again and push new doggo from database
  // doggoList = null;

  res.redirect("/home");
});

app.post("/matches/disliked", (req, res) => {
  console.log(req.body);

  profile.dislikedDoggos.push(doggoList[0]);

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
