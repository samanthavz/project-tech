const express = require("express");
const dotenv = require("dotenv");
const { MongoClient } = require("mongodb");
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
  maxAge: 10,
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
  useNewUrlParser: true,
});

// async function to make sure everything is connected first
app.get("/home", async (req, res) => {
  doggoList = [];
  try {
    // wait untill client is connected
    await client.connect();
    // connect to the database
    const database = client.db("DoggoSwipe");
    // connect to collection
    const collection = database.collection("Doggos");
    // fetch the data
    const cursor = collection.find({});
    // wait for data
    await cursor.forEach((doc) => {
      let push = false;
      profile.likedDoggos.forEach(function (dog) {
        if (doc.userId === dog.userId) {
          push = true;
        }
      });
      profile.dislikedDoggos.forEach(function (dog) {
        if (doc.userId === dog.userId) {
          push = true;
        }
      });
      if (!push && doc.age <= profile.maxAge) {
        doggoList.push(doc);
      }
    });
  } catch (error) {
    console.error(error);
  } finally {
    client.removeAllListeners();
    res.render("home", { title: "DoggoSwipe", doggo: doggoList[0] });
  }
});


//form

// push liked doggo's
app.post("/matches/liked", (req, res) => {
  liked.push(doggoList[0]);
  profile.likedDoggos.push(doggoList[0]);
  res.redirect("/home");
});

// push disliked doggo's
app.post("/matches/disliked", (req, res) => {
  profile.dislikedDoggos.push(doggoList[0]);
  res.redirect("/home");
});

//other routes
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
app.listen(process.env.PORT || port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
