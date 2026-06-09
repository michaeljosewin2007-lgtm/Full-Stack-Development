import express from "express";
import cors from "cors";
import fs from "fs";
import db from "./db.js";
import pool from "./db.js";
import bcrypt from "bcrypt";
import session from "express-session";

const app = express();



app.use(
    cors({
        origin: [
            "http://localhost:5173",
            "http://localhost:4000"
        ],
        credentials: true
    })
);
app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use(
    session({

        secret:
        "studyflow-secret-key",

        resave: false,

        saveUninitialized: false
    })
);

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
 
app.get("/auth", function(req,res){

    res.json({
        message: "Auth Route Working"
    });
});
app.get("/checkAuth", (req, res) => {

    if(req.session.userId){

        return res.json({

            loggedIn: true,

            userId: req.session.userId,

            userName: req.session.userName
        });
    }

    res.json({
        loggedIn: false
    });
});
app.post("/register", async function(req,res){

    const { name, email, password } = req.body;
    if (
        !name?.trim() ||
        !email?.trim() ||
        !password?.trim()
    ) {
        return res.status(400).json({
            message: "All fields are required"
        });
    }

    const existingUser =
    await pool.query(

        `SELECT *
         FROM users
         WHERE email = $1`,

        [email]
    );

    if(existingUser.rows.length > 0){

    return res.status(400).json({

        message:
        "An account with this email already exists."
    });
}

    const hashedPassword =
    await bcrypt.hash(password, 10);

    await pool.query(

        `INSERT INTO users
        (name,email,password)

        VALUES($1,$2,$3)`,

        [
            name,
            email,
            hashedPassword
        ]
    );

    res.json({
    message: "Registration Successful"
});
});
app.post("/login", async function(req,res){

    const { email, password } = req.body;

    const result =
    await pool.query(

        `SELECT *
         FROM users
         WHERE email = $1`,

        [email]
    );

    if(result.rows.length === 0){

    return res.status(400).json({

        message:
        "No account found with this email."
    });
}

    const user =
    result.rows[0];

    const match =
    await bcrypt.compare(
        password,
        user.password
    );

    if(!match){

    return res.status(400).json({
        message: "Email or password incorrect"
    });
}
    req.session.userId =
user.id;

req.session.userName =
user.name;

    res.json({
    message: "Login Successful"
});
});
app.get("/logout", function(req,res){

    req.session.destroy(function(){

        res.json({
    message: "Logged Out"
});
    });
});


app.get("/", (req,res)=>{

    res.json({
        message:"StudyFlow Backend Running"
    });

});
app.post("/addTask", async function(req,res){

    await pool.query(

    `INSERT INTO tasks
    (
        user_id,
        title,
        subject,
        deadline,
        priority
    )

    VALUES ($1,$2,$3,$4,$5)`,

        [
    req.session.userId,
    req.body.title,
    req.body.subject,
    req.body.deadline,
    req.body.priority
]
    );

    res.json({
    message:"Task Added"
});
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

    res.json({
    message:"Task Completed"
});
});
app.get("/tasks", async (req, res) => {

    const result =
    await pool.query(
    `SELECT *
     FROM tasks
     WHERE user_id = $1
     ORDER BY id DESC`,

    [req.session.userId]
);

    res.json(result.rows);

});
app.get(
"/teacher/studentTasks",

async function(req,res){

    const result =
    await pool.query(

        `SELECT *
         FROM tasks
         ORDER BY id DESC`
    );

    res.json(result.rows);
});
app.post("/importTeacherTasks", async (req, res) => {

    const existingTask =
    await pool.query(

        `SELECT *
         FROM tasks
         WHERE user_id = $1
         AND teacher_id = $2`,

        [
            req.session.userId,
            req.body.teacherId
        ]
    );

    if (existingTask.rows.length > 0) {

        return res.json({

            imported: false,

            message:
            "Task already imported"
        });
    }

    await pool.query(

        `INSERT INTO tasks
        (
            user_id,
            teacher_id,
            title,
            subject,
            deadline,
            priority
        )

        VALUES ($1,$2,$3,$4,$5,$6)`,

        [
            req.session.userId,
            req.body.teacherId,
            req.body.title,
            req.body.subject,
            req.body.deadline,
            req.body.priority
        ]
    );

    res.json({

        imported: true,

        message:
        "Imported"
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
