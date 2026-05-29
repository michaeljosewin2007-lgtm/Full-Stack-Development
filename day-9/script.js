// script.js

const playlists = {

    chill: [
        "Sunflower - Post Malone",
        "Night Changes - One Direction",
        "Perfect - Ed Sheeran",
        "Heat Waves - Glass Animals"
    ],

    workout: [
        "Believer - Imagine Dragons",
        "Stronger - Kanye West",
        "Industry Baby - Lil Nas X",
        "Legends Never Die - Against The Current"
    ],

    night: [
        "Blinding Lights - The Weeknd",
        "After Dark - Mr.Kitty",
        "Sweater Weather - The Neighbourhood",
        "505 - Arctic Monkeys"
    ],

    happy: [
        "Levitating - Dua Lipa",
        "Can't Stop The Feeling - Justin Timberlake",
        "On Top Of The World - Imagine Dragons",
        "Happy - Pharrell Williams"
    ]
};
const allSongs = [

    ...playlists.chill,

    ...playlists.workout,

    ...playlists.night,

    ...playlists.happy
];

function shuffleSongs(array) {

    return array.sort(() => Math.random() - 0.5);
}
let currentPlaylist = [];

function generatePlaylist(mood) {

    let selectedPlaylist = playlists[mood];

    let shuffledPlaylist =
    shuffleSongs(selectedPlaylist);
    currentPlaylist = shuffledPlaylist;

    let playlistBox =
    document.getElementById("playlistBox");

    playlistBox.innerHTML = "";

    if (mood === "chill") {

    document.body.style.background =
    "linear-gradient(-45deg, #0f172a, #2563eb, #38bdf8, #0f172a)";

    document.body.style.backgroundSize = "400% 400%";

    document.body.style.animation =
    "gradientMove 10s ease infinite";
    document.querySelectorAll("button")
.forEach(button => {

    button.style.backgroundColor = "#38bdf8";

    button.style.color = "white";

    button.style.boxShadow =
"0 0 10px #38bdf8, 0 0 25px #38bdf8";
});
}

else if (mood === "workout") {

    document.body.style.background =
    "linear-gradient(-45deg, #7f1d1d, #dc2626, #f97316, #7f1d1d)";

    document.body.style.backgroundSize = "400% 400%";

    document.body.style.animation =
    "gradientMove 10s ease infinite";
    document.querySelectorAll("button")
.forEach(button => {

    button.style.backgroundColor = "#f97316";

    button.style.color = "white";

    button.style.boxShadow =
"0 0 10px #f97316, 0 0 25px #f97316";
});
}

else if (mood === "night") {

    document.body.style.background =
    "linear-gradient(-45deg, #111827, #4c1d95, #7c3aed, #111827)";

    document.body.style.backgroundSize = "400% 400%";

    document.body.style.animation =
    "gradientMove 10s ease infinite";
    document.querySelectorAll("button")
.forEach(button => {

    button.style.backgroundColor = "#a855f7";

    button.style.color = "white";

    button.style.boxShadow =
"0 0 10px #c084fc, 0 0 25px #c084fc";
});
}

else if (mood === "happy") {

    document.body.style.background =
"linear-gradient(-45deg, #f59e0b, #f472b6, #fb7185, #fde047)";

    document.body.style.backgroundSize = "400% 400%";

    document.body.style.animation =
    "gradientMove 10s ease infinite";
    document.querySelectorAll("button")
.forEach(button => {

    button.style.backgroundColor = "#fb7185";

    button.style.color = "white";

    button.style.boxShadow =
"0 0 10px #f9a8d4, 0 0 25px #f472b6";
});
}

    for (let i = 0; i < shuffledPlaylist.length; i++) {

        playlistBox.innerHTML +=
        `<li>${shuffledPlaylist[i]}</li>`;
    }
}
function displaySongs(songArray) {

    let playlistBox =
    document.getElementById("playlistBox");

    playlistBox.innerHTML = "";

    for (let i = 0; i < songArray.length; i++) {

        playlistBox.innerHTML +=
        `<li>${songArray[i]}</li>`;
    }
}
function shuffleAllSongs() {

    let reshuffledPlaylist =
    shuffleSongs(currentPlaylist);

    displaySongs(reshuffledPlaylist);
}
currentPlaylist = allSongs;
displaySongs(allSongs);