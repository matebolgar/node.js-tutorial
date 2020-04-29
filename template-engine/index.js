/*
 * Template engine
 */

let express = require("express");
let fs = require("fs");
let app = express();

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  fs.readFile("./characters.json", (err, file) => {
    const characters = JSON.parse(file);
    // (specialisHTML, adat) -> HTML
    res.render("index", { 
        characters: characters,
        // ...
        // ...
        // ...
    });
  });
});

app.listen(4000, () => console.log("Example app listening on port 4000!"));
