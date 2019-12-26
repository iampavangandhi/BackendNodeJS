//Express Basics

const express = require("express");
const app = express();

/* We have GET POST PUT DELETE HEAD etc...*/
app.get("/", (req, res) => {
  res.send("<h1>Hello</h1>");
  //res.redirect("https://google.com");
});

app.get("/about", (req, res) => {
  res.status(200).json({
    user: "John",
    balance: 50000,
    id: 1001
  });
});

//Regex
app.get("/ab*cd", (req, res) => {
  res.send("Regex Page");
});

/* We have res .download() .end() .json() .send() .render() .redirect() .status() */

//Parameter Passing
app.get("/user/:id", (req, res) => {
  res.send(req.params);
});

app.get("/user/:id/status/:status_id", (req, res) => {
  res.send(req.params);
});

app.get("/flight/:from-:to", (req, res) => {
  res.send(req.params);
});

app.get("/contact", (req, res) => {
  res.send("Email : abc@xyz.com");
});

app.get("/services", (req, res) => {
  res.send(
    `<h3>Services:</h3>
    <ul>
      <li>WEB DEV</li>
      <li>APP DEV</li>
      <li>DIGITAL</li>
    </ul>`
  );
});

app.post("/login", (req, res) => {
  res.send("Login :");
});

app.delete("/delete", (req, res) => {
  res.send("Delete it");
});

app.listen(5000, () => {
  console.log("Server is running at Port:5000");
});
