import express from "express";
import cors from "cors";
import fs from "fs";

const app = express();

app.use(cors());
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

app.set("view engine", "ejs");



let tasks = [];
let currentId = 0;



app.get("/", function (req, res) {

    res.render("index", {

        tasks: tasks
    });
});



app.post("/addTask", function (req, res) {

    const newTask = {

    id: currentId++,

    title: req.body.title,

    subject: req.body.subject,

    deadline: req.body.deadline,

    priority: req.body.priority
};

    tasks.push(newTask);

    res.redirect("/");
});
app.post("/completeTask/:id", function(req, res){

    const taskId =
    Number(req.params.id);

    tasks = tasks.filter(function(task){

        return task.id !== taskId;
    });

    res.redirect("/");
});
app.get("/tasks", (req, res) => {

    res.json(tasks);

});
app.post("/tasks", (req, res) => {

    const newTask = {

        id: Date.now(),

        title: req.body.title,

        subject: req.body.subject,

        deadline: req.body.deadline,

        priority: req.body.priority

    };

    tasks.push(newTask);

    res.json(newTask);

});
app.delete("/tasks/:id", (req, res) => {

    const taskId = Number(req.params.id);

    tasks = tasks.filter(
        task => task.id !== taskId
    );

    res.json({
        message: "Task deleted"
    });

});





app.listen(3000, function () {

    console.log("Server running on port 3000");
});
