
// Smart Suggestion System

const suggestionText =
document.getElementById("suggestionText");



const allCards =
document.querySelectorAll(".task-card");



let bestTask = null;

let bestScore = -1;



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
    if (daysLeft < 0) {

    const overdue =
    document.createElement("div");

    overdue.innerText =
    "OVERDUE";

    overdue.classList.add("overdue-badge");

    card.querySelector(".task-info")
    .appendChild(overdue);
}



    const priorityText =
card.querySelector(".priority-badge").innerText;

let priorityScore = 1;

if (priorityText.includes("High")) {

    priorityScore = 3;
}
else if (priorityText.includes("Medium")) {

    priorityScore = 2;
}

const urgencyScore =
priorityScore * 10 - daysLeft;



if (urgencyScore > bestScore) {

    bestScore = urgencyScore;

    bestTask =
    card.querySelector("h3").innerText;
}
});



if (bestTask) {

    suggestionText.innerHTML =
`⚡ <span class="focus-task">
Focus on "${bestTask}"
</span> — deadline approaching!`;
}

const allPriorityText =
document.querySelectorAll(".priority-badge");



allPriorityText.forEach(function(priority){

    const text = priority.innerText;

    const card =
    priority.closest(".task-card");

    if(text.includes("High")){

        card.classList.add(
            "high-priority-card"
        );
    }

    else if(text.includes("Medium")){

        card.classList.add(
            "medium-priority-card"
        );
    }

    else{

        card.classList.add(
            "low-priority-card"
        );
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
function getWeatherCondition(code) {

    const conditions = {

        0: "☀️ Clear Sky",

        1: "🌤 Mainly Clear",

        2: "⛅ Partly Cloudy",

        3: "☁️ Cloudy",

        45: "🌫 Foggy",

        48: "🌫 Dense Fog",

        51: "🌦 Light Drizzle",

        61: "🌧 Rain",

        71: "❄️ Snow",

        95: "⛈ Thunderstorm"
    };

    return conditions[code] || "🌍 Unknown";
}

function loadWeather() {

    navigator.geolocation
    .getCurrentPosition(

        async function(position){

            const lat =
            position.coords.latitude;

            const lon =
            position.coords.longitude;



            const response =
            await fetch(

`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code`

            );



            const data =
            await response.json();



            const condition =
getWeatherCondition(
    data.current.weather_code
);

document
.getElementById("weatherText")
.innerHTML =

`
${condition}
<br>
🌡 ${data.current.temperature_2m}°C
`;
        },



        function(){

            document
            .getElementById(
                "weatherText"
            )
            .innerText =

            "Location access denied";
        }
    );
}
async function loadQuote() {

    try {

        const response =
        await fetch(
        "https://zenquotes.io/api/today"
        );

        const data =
        await response.json();

        document
        .getElementById("quoteText")
        .innerText =
        `"${data[0].q}" — ${data[0].a}`;

    }

    catch(error) {

        const fallbackQuotes = [

            "Small progress is still progress.",

            "Discipline beats motivation.",

            "Focus on consistency.",

            "Keep showing up every day."
        ];



        const randomQuote =
        fallbackQuotes[
            Math.floor(
                Math.random()
                *
                fallbackQuotes.length
            )
        ];



        document
        .getElementById("quoteText")
        .innerText =
        randomQuote;
    }
}
function updateClock() {

    const now =
    new Date();

    const time =
    now.toLocaleTimeString(
        [],
        {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit"
        }
    );

    const date =
    now.toLocaleDateString(
        [],
        {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric"
        }
    );

    document
    .getElementById("timeText")
    .innerText = time;

    document
    .getElementById("dateText")
    .innerText = date;
}
document
.getElementById("getTeacherTasksBtn")
.addEventListener("click", async function(){

    const response =
    await fetch(
        "http://localhost:4000/teacherTasks"
    );

    const teacherTasks =
await response.json();

for(const task of teacherTasks){

    // Import into Day14
    await fetch(
        "http://localhost:3000/importTeacherTasks",
        {
            method: "POST",

            headers:{
                "Content-Type":"application/json"
            },

            body: JSON.stringify(task)
        }
    );

    
}

location.reload();
});

updateClock();

setInterval(updateClock, 1000);
loadQuote();

loadWeather();