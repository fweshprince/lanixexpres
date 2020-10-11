const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const path = require("path");
const track = require("./controllers/track");
const user = require("./controllers/user");
app.use(express.static("public"));
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public"));

app.get("/", async (req, res) => {
  res.render("index");
});
app.get("/about", async (req, res) => {
  res.render("about-us");
});
app.get("/services", async (req, res) => {
  res.render("services");
});
app.get("/contact", async (req, res) => {
  res.render("contact-form");
});
app.get("/lanix/upload", async (req, res) => {
  res.render("upload");
});
app.get("/lanix/signin", async (req, res) => {
  res.render("signin", { message: "" });
});
app.get("/lanix/signup", async (req, res) => {
  res.render("signup", { message: "" });
});
app.get("/lanix/test", async (req, res) => {
  res.render("trackingpage", { message: "" });
});
app.use("/track", track);
app.use("/user", user);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});
mongoose.connection
  .once("open", () => {
    console.log("Connected to DB");
  })
  .on("error", () => {
    console.log("Theres been an error");
  });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Listening on port " + PORT);
});
