//sk-e631bd56-276b-4802-852e-7aec94ac4749

// app.get("", (req, res) => {
//   res.send("<h1>Weather</h1>");
// });

// app.get("/help", (req, res) => {
//   res.send([{ name: "Andrew" }, { name: "Sarah" }]);
// });

// app.get("/about", (req, res) => {
//   res.send("<h1>About</h1>");
// });
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");
const path = require("path");
const express = require("express");
const hbs = require("hbs");

const app = express();
const port = process.env.PORT || 3000;
// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");
console.log(viewsPath);

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static sirectory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Dustin",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "Dustin",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    text: "This is some helpful text",
    name: "Dustin",
  });
});

app.get("/weather", (req, res) => {
  const address = req.query.address;
  console.log("address: ", address);
  if (!address) {
    return res.send({ error: "You must provide address" });
  }
  // --------------------------------------------------------------
  geocode(address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.send({ error: error });
    }
    console.log("lat, long", latitude, longitude);
    forecast(latitude, longitude, (error, forcastData) => {
      if (error) {
        return res.send({ error: error });
      }
      // console.log(`This is ${location} and ${forcastData}`);
      res.send({
        forecast: forcastData,
        location: location,
        address: req.query.address,
      });
    });
  });
  /// --------------------------------------------------------------
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({ error: "You must provide a search term" });
  }
  console.log(req.query.search);
  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Dustin",
    errorMessage: "Help article not found",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Dustin",
    errorMessage: "My 404 page error",
  });
});

app.listen(port, () => {
  console.log("Server is up on port " + port);
});
