let countdownElement = document.getElementById("countdown");
let timeInput = document.getElementById("timeInput");
let startBtn = document.getElementById("startBtn");
let pauseBtn = document.getElementById("pauseBtn");
let resetBtn = document.getElementById("resetBtn");

let countdown;
let timeLeft;
let isPaused = false;
let isRunning = false;

startBtn.addEventListener("click", startCountdown);
pauseBtn.addEventListener("click", pauseResumeCountdown);
resetBtn.addEventListener("click", resetCountdown);

function startCountdown() {
    if (isRunning) return; // Prevent starting if already running

    timeLeft = parseInt(timeInput.value);
    if (isNaN(timeLeft) || timeLeft <= 0) {
        alert("Please enter a valid time!");
        return;
    }

    countdownElement.textContent = timeLeft;
    isRunning = true; // Set isRunning to true when the countdown starts

    countdown = setInterval(() => {
        if (!isPaused) {
            timeLeft--;
            countdownElement.textContent = timeLeft;
            if (timeLeft <= 0) {
                clearInterval(countdown);
                countdownElement.textContent = "Time's up!";
                isRunning = false; // Reset isRunning when the timer ends
            }
        }
    }, 1000);
}

function pauseResumeCountdown() {
    if (!isRunning) return; // Prevent pausing if not running

    if (isPaused) {
        isPaused = false;
        pauseBtn.textContent = "Pause";
        pauseBtn.style.backgroundColor = "#42a5f5"; 
    } else {
        // Pause the countdown
        isPaused = true;
        pauseBtn.textContent = "Resume";
        pauseBtn.style.backgroundColor = "#74787c";  

    }
}

function resetCountdown() {
    clearInterval(countdown);
    countdownElement.textContent = "0";
    timeInput.value = "";
    isPaused = false; 
    isRunning = false; 
    pauseBtn.textContent = "Pause"; 
    pauseBtn.style.backgroundColor = "#1b68a7";
}
