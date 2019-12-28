const express = require("express");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");

const port = process.env.PORT || 3000;

//Bring all routes
const auth = require("./routes/api/auth");
const profile = require("./routes/api/profile");
const questions = require("./routes/api/questions");

//Express
const app = express();

//Middleware for bodyparser
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

//MongoDB configuration
const db = require("./setup/myurl").mongoURL;

//Connect to DB
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Database connected sucessfully..."))
  .catch(err => console.log(error));

//Testing route
app.get("/", (req, res) => {
  res.send("Hey Big Stack...");
});

//Actual routes
app.use("/api/auth", auth);
app.use("/api/profile", profile);
app.use("/api/questions", questions);

//Listening at 3000
app.listen(port, () => {
  console.log(`App is running at ${port}`);
});
