// app.js

const express = require("express");

const app = express();

app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

app.set("view engine", "ejs");



let messages = [

    {
        username: "NeoBot",
        text: "Welcome to VIBECHAT ⚡"
    }
];



app.get("/", function (req, res) {

    res.render("index", {

        messages: messages
    });
});



app.post("/send", function (req, res) {

    const newMessage = {

        username: req.body.username,

        text: req.body.message
    };

    messages.push(newMessage);

    res.redirect("/");
});



app.listen(3000, function () {

    console.log("Server running on port 3000");
});