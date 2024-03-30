let startTime;
let running = false;
let lapTimes = [];

const hrDisplay = document.getElementById("hr");
const minDisplay = document.getElementById("min");
const secDisplay = document.getElementById("sec");
const countDisplay = document.getElementById("count");
const lapButton = document.getElementById("lap");
const lapList = document.getElementById("lapList");

lapButton.addEventListener("click", handleLap);

function startTimer() {
    if (!running) {
        startTime = Date.now();
        running = true;
        updateTimer();
    }
}

function stopTimer() {
    running = false;
}

function resetTimer() {
    running = false;
    startTime = undefined;
    lapTimes = [];
    updateDisplay(0, 0, 0, 0);
    lapList.innerHTML = "";
}

function updateTimer() {
    if (running) {
        const elapsedTime = Date.now() - startTime;
        const hours = Math.floor(elapsedTime / 3600000);
        const minutes = Math.floor((elapsedTime % 3600000) / 60000);
        const seconds = Math.floor((elapsedTime % 60000) / 1000);
        const milliseconds = Math.floor((elapsedTime % 1000) / 10);

        updateDisplay(hours, minutes, seconds, milliseconds);
        requestAnimationFrame(updateTimer);
    }
}

function updateDisplay(hours, minutes, seconds, count) {
    hrDisplay.textContent = pad(hours);
    minDisplay.textContent = pad(minutes);
    secDisplay.textContent = pad(seconds);
    countDisplay.textContent = pad(count);
}

function pad(num) {
    return num.toString().padStart(2, "0");
}

function handleLap() {
    if (running) {
        const elapsedTime = Date.now() - startTime;
        const lapTime = formatTime(elapsedTime);
        lapTimes.push(lapTime);
        displayLap(lapTime);
    }
}

function formatTime(time) {
    const hours = Math.floor(time / 3600000);
    const minutes = Math.floor((time % 3600000) / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    const milliseconds = Math.floor((time % 1000) / 10);
    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}.${pad(milliseconds)}`;
}

let lapCount = 0; // Add a lap counter

function displayLap(lapTime) {
    lapCount++; // Increment lap counter
    const li = document.createElement("li");
    li.textContent = `Time ${lapCount}: ${lapTime}`; // Display lap number along with lap time
    lapList.appendChild(li);
}

document.getElementById("start").addEventListener("click", startTimer);
document.getElementById("stop").addEventListener("click", stopTimer);
document.getElementById("reset").addEventListener("click", resetTimer);
