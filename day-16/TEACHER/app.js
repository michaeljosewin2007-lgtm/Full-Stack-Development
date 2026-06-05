import express from "express";
import axios from "axios";
import cors from "cors";
import pool from "../db.js";

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

app.set("view engine", "ejs");


let tasks = [];

app.get("/", function(req,res){

    res.render("index", {

        tasks,

        studentTasks: []
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
app.get("/teacherTasks", async (req,res)=>{

    const result =
    await pool.query(
        "SELECT * FROM teacher_tasks ORDER BY id DESC"
    );

    res.json(result.rows);
});
app.post("/teacherTasks", async (req,res)=>{

    await pool.query(

        `INSERT INTO teacher_tasks
        (title, subject, deadline, priority)

        VALUES ($1,$2,$3,$4)`,

        [
            req.body.title,
            req.body.subject,
            req.body.deadline,
            req.body.priority
        ]
    );

    res.json({
        message:"Task stored"
    });
});
app.delete("/teacherTasks/:id", async (req,res)=>{

    const taskId =
    Number(req.params.id);

    await pool.query(

        `DELETE FROM teacher_tasks
         WHERE id = $1`,

        [taskId]
    );

    await axios.delete(
        `http://localhost:3000/teacherImportedTasks/${taskId}`
    );

    res.json({
        message: "Deleted everywhere"
    });
});

app.listen(4000, function () {

    console.log("Server running on port 4000");
});








