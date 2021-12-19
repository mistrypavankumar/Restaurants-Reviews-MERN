const express = require("express");
const cors = require("cors");
const restaurants = require("./api/restaurants.route.js");

const app = express();

//middle-ware
app.use(cors());
app.use(express.json());

// server location
app.use("/api/v1/restaurants", restaurants);

// if router doesn't occurs
app.use("*", (req, res) => res.status(404).json({ error: "not found" }));

module.exports = app;
