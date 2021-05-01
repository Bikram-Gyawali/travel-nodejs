const express = require("express");
var app = express();
var fortune = require("./lib/fortune.js");
const handlebars = require("express-handlebars").create({
  defaultLayout: "main",
});
app.engine("handlebars", handlebars.engine);
app.set("view engine", "handlebars");
app.set("port", process.env.PORT || 3000);
app.use(express.static(__dirname + "/public"));
app.get("/", (req, res) => {
  res.type("text/plain");
  res.send("mad travel");
});

app.get("/about*", (req, res) => {
  res.render("about", { fortune: fortune.getFortune() });
});

app.get("/about/contact", (req, res) => {
  res.type("text/plain");
  res.send("About contacts tavel");
});

app.get("/about/directions", function (req, res) {
  res.type("text/plain");
  res.send("About directions tavel");
});
//custom 404 page
app.use((req, res, next) => {
  res.status(404);
  res.render("404");
  // next();
});

//custom 500 page

app.use(function (err, req, res, next) {
  console.log(err.stack);
  res.status(500);
  res.render("500");
  // next();
});

app.listen(app.get("port"), () => {
  console.log(
    "Express started on http://localhost:" +
      app.get("port") +
      "; press Ctrl-C to terminate."
  );
});
