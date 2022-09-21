const express = require("express");
const path = require("path");
const fs = require("fs");
const notes = require("./db/db.json");
const uuid = require("uuid");
const application = express();
const port = process.env.PORT || 3017;

application.use(express.urlencoded({ extended: true}));
application.use(express.json());
application.use(express.static("./public"));

application.get("api/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "./db/db.json"))});