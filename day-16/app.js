import express from "express";
import cors from "cors";
import fs from "fs";
import db from "./db.js";
import pool from "./db.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

app.set("view engine", "ejs");

db.query("SELECT NOW()")
.then(result => {

    console.log(
        "Database Connected:",
        result.rows[0]
    );

})
.catch(error => {

    console.log(error);
});
 




app.get("/", async function (req, res) {

    const result =
    await pool.query(
        "SELECT * FROM tasks ORDER BY id DESC"
    );

    res.render("index", {

        tasks: result.rows
    });
});

app.post("/addTask", async function(req,res){

    await pool.query(

        `INSERT INTO tasks
        (title, subject, deadline, priority)

        VALUES ($1,$2,$3,$4)`,

        [
            req.body.title,
            req.body.subject,
            req.body.deadline,
            req.body.priority
        ]
    );

    res.redirect("/");
});
app.post(
"/completeTask/:id",

async function(req,res){

    const taskId =
    Number(req.params.id);

    await pool.query(

        `DELETE FROM tasks
         WHERE id = $1`,

        [taskId]
    );

    res.redirect("/");
});
app.get("/tasks", async (req, res) => {

    const result =
    await pool.query(
        "SELECT * FROM tasks ORDER BY id DESC"
    );

    res.json(result.rows);

});
app.post("/importTeacherTasks", async (req, res) => {

    const exists =
    await pool.query(

        `SELECT * FROM tasks

         WHERE teacher_id = $1
         AND title = $2
         AND subject = $3
         AND deadline = $4
         AND priority = $5`,

        [
            req.body.teacherId,
            req.body.title,
            req.body.subject,
            req.body.deadline,
            req.body.priority
        ]
    );

    if (exists.rows.length > 0) {

        return res.json({
            message: "Task already imported"
        });
    }

    await pool.query(

        `INSERT INTO tasks
        (
            teacher_id,
            title,
            subject,
            deadline,
            priority
        )

        VALUES ($1,$2,$3,$4,$5)`,

        [
            req.body.teacherId,
            req.body.title,
            req.body.subject,
            req.body.deadline,
            req.body.priority
        ]
    );

    res.json({
        message: "Imported"
    });
});
app.delete("/tasks/:id", async (req,res)=>{

    const taskId =
    Number(req.params.id);

    await pool.query(

        `DELETE FROM tasks
         WHERE id = $1`,

        [taskId]
    );

    res.json({
        message:
        "Task deleted"
    });
});
app.delete(
"/teacherImportedTasks/:teacherId",

async (req,res)=>{

    const teacherId =
    Number(req.params.teacherId);

    await pool.query(

        `DELETE FROM tasks
         WHERE teacher_id = $1`,

        [teacherId]
    );

    res.json({
        message:"Imported tasks removed"
    });
});



app.listen(3000, function () {

    console.log("Server running on port 3000");
});
