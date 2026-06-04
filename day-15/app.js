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
app.post("/importTeacherTasks", (req, res) => {

    const exists = tasks.some(task =>

        task.title === req.body.title &&
        task.subject === req.body.subject &&
        task.deadline === req.body.deadline &&
        task.priority === req.body.priority
    );

    if(exists){

        return res.json({
            message: "Task already imported"
        });
    }

    const teacherTask = {

    id: currentId++,

    teacherId: req.body.id,

    title: req.body.title,

    subject: req.body.subject,

    deadline: req.body.deadline,

    priority: req.body.priority
};

    tasks.push(teacherTask);

    res.json({
        message: "Imported"
    });
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
app.delete("/teacherImportedTasks/:teacherId", (req,res)=>{

    const teacherId =
    Number(req.params.teacherId);

    tasks = tasks.filter(task => {

        return task.teacherId !== teacherId;
    });

    res.json({
        message: "Imported tasks removed"
    });
});





app.listen(3000, function () {

    console.log("Server running on port 3000");
});
