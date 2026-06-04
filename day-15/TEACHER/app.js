import express from "express";
import axios from "axios";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

app.set("view engine", "ejs");



let tasks = [];

let currentId = 0;
let teacherTasks = [];
let teacherId = 0;



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
app.get("/teacherTasks", (req,res)=>{

    res.json(teacherTasks);
});
app.post("/teacherTasks", (req,res)=>{

    const teacherTask = {

        id: teacherId++,

        title: req.body.title,

        subject: req.body.subject,

        deadline: req.body.deadline,

        priority: req.body.priority
    };

    teacherTasks.push(teacherTask);

    res.json({
        message:"Task stored"
    });
});
app.delete("/teacherTasks/:id", async (req,res)=>{

    const taskId =
    Number(req.params.id);

    teacherTasks =
    teacherTasks.filter(task => {

        return task.id !== taskId;
    });

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








