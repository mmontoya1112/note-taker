const express = require("express");
const path = require("path");
const fs = require("fs");
const notes = require("./db/db.json");
const uuid = require("uuid");
const application = express();
const PORT = process.env.PORT || 3002;
const { DH_CHECK_P_NOT_SAFE_PRIME, SSL_OP_SSLEAY_080_CLIENT_DH_BUG } = require("constants");


application.use(express.urlencoded({ extended: true}));
application.use(express.json());
application.use(express.static("./public"));

application.get("/api/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "./db/db.json"))});

application.post("/api/notes", (req, res) => {
    const notes = JSON.parse(fs.readFileSync("./db/db.json"));
    const newNote = req.body;
    newNote.id = uuid.v4();
    notes.push(newNote);
    fs.writeFileSync("./db/db.json", JSON.stringify(notes))
    res.json(notes);
});

application.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});
application.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});

application.listen(PORT, function () {
    console.log("listening on port: " + PORT);
});