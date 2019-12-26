const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use("/login", express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  res.send("hello world");
});

app.post("/login", (req, res) => {
  console.log(req.body.email);
  //Database Process
  res.redirect("/");
});

app.listen(3000, () => {
  console.log("running");
});
