// Priority Glow Logic

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



    const priorityText =
card.querySelector(".priority").innerText;

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

    suggestionText.innerText =
    `⚡ Focus on "${bestTask}" — deadline approaching!`;
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

updateClock();

setInterval(updateClock, 1000);
loadQuote();

loadWeather();