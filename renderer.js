let drinkCount = 3;
let countdown;
let minutesToDrink = 30;
let timeLeft = minutesToDrink * 60; // Convert minutes to seconds

// Audio elements
let potionAudio = new Audio("assets/music sfx/potion-bubbling.mp3");
potionAudio.loop = true;

let timerAudio = new Audio("assets/music sfx/magic-timer.mp3");

playBackgroundMusic();

document.querySelector('.close-box').addEventListener('click', () => {
  window.close();
});

function playBackgroundMusic() {
  const backgroundMusic = new Audio("assets/music sfx/Under This Luminous Sky  Official Soundtrack -  3. Weaved Theme.mp3");
  backgroundMusic.loop = true;
  backgroundMusic.volume = 0.5;
  backgroundMusic.currentTime = 2;
  backgroundMusic.play(); // Start playing immediately
}

// Function to play a sound effect (using predefined instances)
function playSound(audio) {
  if (audio.paused) {
    audio.volume = 0.4;
    audio.currentTime = 0; // Restart sound
    audio.play();
  }
}

// Function to stop a sound effect
function stopSound(audio) {
  if (!audio.paused) {
    audio.pause();
    audio.currentTime = 0; // Reset to start
  }
}

// Start button → Menu screen
function goToMenu() {
  console.log("Going to menu screen...");
  switchScreen("start-screen", "menu-screen");
}

function goToCountdown() {
  switchScreen("menu-screen", "countdown-screen");
  startCountdown();
}

function startCountdown() {
  clearInterval(countdown);
  timeLeft = minutesToDrink * 60;
  updateTimerDisplay();

  playSound(potionAudio); // Play potion sound

  countdown = setInterval(() => {
    timeLeft--;
    updateTimerDisplay();
    if (timeLeft <= 0) {
      clearInterval(countdown);
      switchScreen("countdown-screen", "timesup-screen");
    }
  }, 1000);
}

function updateTimerDisplay() {
  let minutes = Math.floor(timeLeft / 60);
  let seconds = timeLeft % 60;
  document.getElementById("timer").innerText =
    `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}

function drinkWater() {
  if (drinkCount > 1) {
    drinkCount--;
    updateDrinkCountText();
    switchScreen("timesup-screen", "countdown-screen");
    startCountdown();
  } else {
    switchScreen("timesup-screen", "cast-spell-screen");
  }
}

function updateDrinkCountText() {
  const drinkCountElement = document.getElementById("drink-count-text");
  if (drinkCountElement) {
    drinkCountElement.innerText = drinkCount > 0 ? `${drinkCount} more to go!` : `No more to go!`;
  }
}

function goToFinalScreen() {
  switchScreen("cast-spell-screen", "reward-screen");
}

// Function to switch screens
function switchScreen(hide, show) {
  const hideScreen = document.getElementById(hide);
  const showScreen = document.getElementById(show);

  if (!hideScreen || !showScreen) {
    console.error("Error: One of the screens does not exist.");
    return;
  }
  console.log(`Hiding ${hide} and showing ${show}`);

  hideScreen.style.display = "none";
  showScreen.style.display = "block";

  // Play unique sounds for different screens
  if (show === "reward-screen") {
    playSound(new Audio("assets/music sfx/magic-reveal.mp3"));
    playSound(new Audio("assets/music sfx/mixkit-fairy-glitter-867.mp3"));
  } else if (show === "cast-spell-screen") {
    playSound(new Audio("assets/music sfx/mixkit-spellcaster-fairy-swoosh-1463.mp3"));
  } else if (show === "timesup-screen") {
    playSound(timerAudio); // Use global timer instance
  }

  // Stop potion sound when leaving countdown screen
  if (hide === "countdown-screen") {
    stopSound(potionAudio);
  }
  if (hide === "timesup-screen") {
    stopSound(timerAudio);
  }
}
