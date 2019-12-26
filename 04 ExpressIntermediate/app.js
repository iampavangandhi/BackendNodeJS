//Express Intermediate
const express = require("express");
const app = express();

//Middleware
/* We have app.use(), app.set(), etc...*/
var myconsolelog = function(req, res, next) {
  console.log("I am a MIDDLEWARE");
  next();
};

var servertime = function(req, res, next) {
  req.requestTime = Date.now();
  next();
};

//Middleware
app.use(servertime);

//Routes
app.get("/", (req, res) => {
  res.send("Hello World" + "and time is :" + req.requestTime);
  console.log("Hello world from /");
});

//Listening
app.listen(5000, () => console.log("Server is running at port 5000..."));
