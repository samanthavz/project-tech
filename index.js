const express = require("express");
const dotenv = require("dotenv");
const { MongoClient } = require("mongodb");
const app = express();
const port = 3000;

// see https://www.npmjs.com/package/dotenv
dotenv.config();

let liked = [];
let doggoList = [];

let profile = [];

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

// connect to client
const connect = client.connect();

// async function to make sure everything is connected first
app.get("/home", async (req, res) => {
  doggoList = [];
  try {
    // connect to the database and collection for doggo and user
    const database = client.db("DoggoSwipe");
    const collection = database.collection("Doggos");
    const collection2 = database.collection("Users");

    // fetch the data user
    const cursor2 = await collection2.find({});
    await cursor2.forEach((user) => {
      profile.push(user);
    });

    // fetch the data doggos
    const cursor = collection.find({});
    // wait for data
    await cursor.forEach((doc) => {
      let push = false;
      profile[0].likedDoggos.forEach(function (dog) {
        if (doc.userId === dog.userId) {
          push = true;
        }
      });
      profile[0].dislikedDoggos.forEach(function (dog) {
        if (doc.userId === dog.userId) {
          push = true;
        }
      });
      if (!push && doc.age <= profile[0].maxAge) {
        doggoList.push(doc);
      }
    });
  } catch (error) {
    console.error(error);
  } finally {
    res.render("home", { title: "DoggoSwipe", doggo: doggoList[0] });
  }
});

app.post("/matches/deleted", async (req, res) => {
  bodyId = Number(req.body.dog);
  try {
    // connect to the database and collection
    const database = await client.db("DoggoSwipe");
    const collection = await database.collection("Doggos");

    // delete the doggo
    const result = await collection.deleteOne({ userId: bodyId });

    liked.forEach((dog) => {
      if (dog.userId == bodyId) {
        let index = liked.indexOf(dog);
        if (index > -1) {
          liked.splice(index, 1);
        }
      }
    });
  } catch (error) {
    console.error(error);
  } finally {
    res.redirect("/matches");
  }
});

// push liked doggo's
app.post("/matches/liked", (req, res) => {
  liked.push(doggoList[0]);
  profile[0].likedDoggos.push(doggoList[0]);

  setTimeout(redirect, 1500);
  function redirect() {
    res.redirect("/home");
  }
});

// push disliked doggo's
app.post("/matches/disliked", (req, res) => {
  profile[0].dislikedDoggos.push(doggoList[0]);
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

//error handling
app.use((req, res, next) => {
  res.status(404).send("sorry can't find that!");
});

//connect
app.listen(process.env.PORT || port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
