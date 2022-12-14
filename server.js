const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");

const blogRoutes = require('./routes/blogRoutes');

//express app
const app = express();

//connect to mongodb
const dbURI =
  "mongodb+srv://ToreTurkmen:bttm._2009@cluster0.ppc0yws.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => app.listen(8002))
  .catch((err) => console.log(err));

//register view engine
app.set("view engine", "ejs");

//listen for requests

//middleware & static files
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true}));



//routes
app.get("/", (req, res) => {
 
 res.redirect('/blogs');
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

//blog routes

app.use('/blogs',blogRoutes);

//404 page
app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
