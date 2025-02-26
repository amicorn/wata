let drinkCount = 3;
let countdown;
let minutesToDrink = 0.1;
let timeLeft = minutesToDrink * 60; // Convert minutes to seconds

// 🔹 Persistent Sounds (Looping or Multi-Screen Sounds)
let sounds = {
  potion: createAudio("assets/music sfx/potion-bubbling.mp3", { loop: true, volume: 0.4 }),
  timer: createAudio("assets/music sfx/magic-timer.mp3"),
  waterDrop: createAudio("assets/music sfx/water-drop-pop.mp3"),
  background: createAudio("assets/music sfx/Under This Luminous Sky  Official Soundtrack -  3. Weaved Theme.mp3", { loop: true, volume: 0.5, startTime: 2 }),
};

// 🔹 Screen-Specific Sound Effects (One-Time Sounds)
const soundEffects = {
  "reward-screen": ["magic-reveal.mp3", "mixkit-fairy-glitter-867.mp3"],
  "cast-spell-screen": ["mixkit-spellcaster-fairy-swoosh-1463.mp3"],
  "timesup-screen": ["magic-timer.mp3"],
};

// 🎵 Start Background Music
sounds.background.play();

// 🔹 Create a new audio instance with configurations
function createAudio(src, { loop = false, volume = 1.0, startTime = 0 } = {}) {
  let audio = new Audio(src);
  audio.loop = loop;
  audio.volume = volume;
  audio.currentTime = startTime;
  return audio;
}

// 🔈 Play any sound (supports looping, volume, start time)
function playSound(audio, { loop = false, volume = 0.4, startTime = 0 } = {}) {
  if (!audio) return;
  audio.loop = loop;
  audio.volume = volume;
  audio.currentTime = startTime;
  audio.play();
}

// 🔇 Stop any sound
function stopSound(audio) {
  if (audio && !audio.paused) {
    audio.pause();
    audio.currentTime = 0;
    audio.src = audio.src;
  }
}

// ❌ Close Button
document.querySelector('.close-box').addEventListener('click', () => window.close());

// 💧 Water Drop Hover SFX
document.addEventListener("DOMContentLoaded", function () {
  const iconDrop = document.querySelector(".icon-drop");
  if (iconDrop) {
    iconDrop.addEventListener("mouseenter", () => playSound(sounds.waterDrop));
    iconDrop.addEventListener("mouseleave", () => stopSound(sounds.waterDrop));
  }
});

// 📌 Navigation Functions
function goToMenu() {
  console.log("Going to menu screen...");
  switchScreen("start-screen", "menu-screen");
}

function goToCountdown() {
  switchScreen("menu-screen", "countdown-screen");
  startCountdown();
}

// ⏳ Start Countdown Timer
function startCountdown() {
  clearInterval(countdown);
  timeLeft = minutesToDrink * 60;
  updateTimerDisplay();
  playSound(sounds.potion);

  countdown = setInterval(() => {
    timeLeft--;
    updateTimerDisplay();
    if (timeLeft <= 0) {
      clearInterval(countdown);
      switchScreen("countdown-screen", "timesup-screen");
    }
  }, 1000);
}

// 🔢 Update Timer Display
function updateTimerDisplay() {
  let minutes = Math.floor(timeLeft / 60);
  let seconds = timeLeft % 60;
  document.getElementById("timer").innerText = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}

// 🚰 Drink Water Logic
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

// 🔢 Update Drink Count Text
function updateDrinkCountText() {
  const drinkCountElement = document.getElementById("drink-count-text");
  if (drinkCountElement) {
    drinkCountElement.innerText = drinkCount > 0 ? `${drinkCount} more to go!` : `No more to go!`;
  }
}

// 🏆 Final Screen
function goToFinalScreen() {
  switchScreen("cast-spell-screen", "reward-screen");
}

// 📌 Switch Screens + Manage Sounds
function switchScreen(hide, show) {
  document.getElementById(hide).style.display = "none";
  document.getElementById(show).style.display = "block";

  if (show === "timesup-screen") playSound(sounds.timer);
  if (hide === "timesup-screen") {
    console.log("hiding timer screen");
    stopSound(sounds.timer);
  }
  if (hide === "countdown-screen") stopSound(sounds.potion);

  // 🎶 Play sounds assigned to the new screen
  if (soundEffects[show]) {
    soundEffects[show].forEach(sound => playSound(new Audio(`assets/music sfx/${sound}`)));
  }
}
