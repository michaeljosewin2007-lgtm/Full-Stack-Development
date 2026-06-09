// Priority Glow Logic
console.log("SCRIPT LOADED");
 
const taskCards =
document.querySelectorAll(".task-card");

taskCards.forEach(function(card) {

    const priorityText =
    card.querySelector(".priority").innerText;

    if (priorityText.includes("High")) {

        card.style.boxShadow =
        "0 0 20px rgba(255, 0, 0, 0.5)";
    }
 
    else if (priorityText.includes("Medium")) {

        card.style.boxShadow =
        "0 0 20px rgba(255, 255, 0, 0.4)";
    }

    else {

        card.style.boxShadow =
        "0 0 20px rgba(0, 255, 150, 0.4)";
    }
});
// ======================
// GET TASKS
// ======================

document
.getElementById("teacherTasksBtn")
.addEventListener("click", async function(){

    const response =
    await fetch(
        "http://localhost:4000/teacherTasks"
    );

    const tasks =
    await response.json();

    let output = "";

    tasks.forEach(function(task){

        output += `
        <div class="student-card">

            <h3>${task.title}</h3>

            <p>📚 ${task.subject}</p>

            <p>📅 ${task.deadline}</p>

            <p>⚡ ${task.priority}</p>

            <button
                class="delete-task-btn"
                data-id="${task.id}"
            >
                Delete ❌
            </button>

        </div>
        `;
    });

    document
    .getElementById(
        "studentTasksContainer"
    )
    .innerHTML = output;

    document
    .querySelectorAll(".delete-task-btn")
    .forEach(function(button){

        button.addEventListener(
            "click",
            async function(){

                const taskId =
                button.dataset.id;

                await fetch(
                    `http://localhost:4000/teacherTasks/${taskId}`,
                    {
                        method: "DELETE"
                    }
                );

                button
                .closest(".student-card")
                .remove();

                document
                .getElementById("apiResult")
                .innerHTML =
                "✅ Assignment removed everywhere";
            }
        );
    });
});
document
.getElementById("studentTasksBtn")
.addEventListener("click", async function(){

    const response =
    await fetch(
        "http://localhost:3000/teacher/studentTasks"
    );

    const tasks =
    await response.json();

    let output = "";

    tasks.forEach(function(task){

        output += `
        <div class="student-card">

            <h3>${task.title}</h3>

            <p>📚 ${task.subject}</p>

            <p>⚡ ${task.priority}</p>

        </div>
        `;
    });

    document
    .getElementById(
        "studentTasksContainer"
    )
    .innerHTML = output;

    document
    .getElementById("apiResult")
    .innerHTML =
    `✅ ${tasks.length} student tasks found`;
});

// ======================
// POST TASK
// ======================

document
.getElementById("postTaskBtn")
.addEventListener("click", async function(){

    const title =
    document.querySelector(
        'input[name="title"]'
    ).value;

    const subject =
    document.querySelector(
        'input[name="subject"]'
    ).value;

    const priority =
    document.querySelector(
        'select[name="priority"]'
    ).value;

    const deadline =
    document.querySelector(
        'input[name="deadline"]'
    ).value;

    console.log(title);
    console.log(subject);
    console.log(priority);
    console.log(deadline);

    await fetch(
    "http://localhost:4000/teacherTasks",
        {
            method: "POST",

            headers: {
                "Content-Type":
                "application/json"
            },

            body: JSON.stringify({

                title,
                subject,
                deadline,
                priority
            })
        }
    );

    document
    .getElementById("apiResult")
    .innerHTML =
    "✅ Teacher task sent successfully";
});


// Smart Suggestion System

const suggestionText =
document.getElementById("suggestionText");



const allCards =
document.querySelectorAll(".task-card");



let mostUrgentTask = null;

let smallestDays = Infinity;



allCards.forEach(function(card){

    const deadlineText =
    card.querySelector(".deadline").innerText;

    const cleanDate =
    deadlineText.replace("Deadline: ", "");

    const taskDate =
    new Date(cleanDate);

    const today =
    new Date();

    const difference =
    taskDate - today;

    const daysLeft =
    Math.ceil(
        difference /
        (1000 * 60 * 60 * 24)
    );



    if (daysLeft < smallestDays) {

        smallestDays = daysLeft;

        mostUrgentTask =
        card.querySelector("h3").innerText;
    }
});



if (mostUrgentTask) {

    suggestionText.innerText =
    `⚡ Focus on "${mostUrgentTask}" — deadline approaching!`;
}

const allPriorityText =
document.querySelectorAll(".priority");



allPriorityText.forEach(function(priority){

    const text =
    priority.innerText;



    if (text.includes("High")) {

        priority.style.color =
        "#ef4444";

        priority.style.textShadow =
        "0 0 10px rgba(239,68,68,0.7)";
        priority.closest(".task-card").style.border =
"1px solid rgba(239,68,68,0.5)";
    }



    else if (text.includes("Medium")) {

        priority.style.color =
        "#facc15";

        priority.style.textShadow =
        "0 0 10px rgba(250,204,21,0.7)";
        priority.closest(".task-card").style.border =
"1px solid rgba(250,204,21,0.5)";
    }



    else {

        priority.style.color =
        "#38bdf8";

        priority.style.textShadow =
        "0 0 10px rgba(56,189,248,0.7)";
        priority.closest(".task-card").style.border =
"1px solid rgba(56,189,248,0.5)";
    }
});

const modeToggle =
document.getElementById("modeToggle");



modeToggle.addEventListener("change", function(){

    if (modeToggle.checked) {

        // Focus Mode
        localStorage.setItem(
            "studyflowMode",
            "focus"
        );

        document.body.style.background =
        "linear-gradient(-45deg, #111827, #1e1b4b, #312e81, #111827)";

        document.body.style.backgroundSize =
        "400% 400%";

        document.body.style.animation =
        "gradientMove 10s ease infinite";
    }

    else {

        // Chill Mode
        localStorage.setItem(
    "studyflowMode",
    "chill"
);

        document.body.style.background =
        "linear-gradient(-45deg, #0f172a, #164e63, #0f766e, #0f172a)";

        document.body.style.backgroundSize =
        "400% 400%";

        document.body.style.animation =
        "gradientMove 10s ease infinite";
    }
});
const savedMode =
localStorage.getItem("studyflowMode");

if (savedMode === "focus") {

    modeToggle.checked = true;

    modeToggle.dispatchEvent(
        new Event("change")
    );
}
else if (savedMode === "chill") {

    modeToggle.checked = false;

    modeToggle.dispatchEvent(
        new Event("change")
    );
}
