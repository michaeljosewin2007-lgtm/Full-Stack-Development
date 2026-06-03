import express from "express";

const app = express();

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



app.listen(3000, function () {

    console.log("Server running on port 3000");
});
