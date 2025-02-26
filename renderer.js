let drinkCount = 3;
let countdown;
let minutesToDrink = 0.1;
let timeLeft = minutesToDrink * 60; // convert minutes to seconds

let potionAudio = new Audio("assets/music sfx/mixkit-magic-potion-music-and-fx-2831.mp3");
potionAudio.loop = true; // Enable looping
potionAudio.volume = 0.4; // Adjust volume

const backgroundMusic = new Audio("assets/music sfx/Under This Luminous Sky  Official Soundtrack -  3. Weaved Theme.mp3");
backgroundMusic.loop = true; // Loop music forever
backgroundMusic.volume = 0.5; // Default volume
backgroundMusic.currentTime = 2;
backgroundMusic.play(); // Start playing immediately


document.querySelector('.close-box').addEventListener('click', () => {
  window.close();
});

document.querySelector('.draggable').addEventListener('mousedown', (event) => {
  // Start dragging the window
  remote.getCurrentWindow().setBounds({
    x: event.screenX,
    y: event.screenY,
    width: window.innerWidth,
    height: window.innerHeight,
  });
});

// Function to play a sound effect
function playSound(soundFile) {
  const audio = new Audio(`assets/music sfx/${soundFile}`);
  audio.volume = 0.4;  // Adjust volume (0.0 to 1.0)
  audio.currentTime = 0; // Restart sound if already playing
  audio.play();
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
  clearInterval(countdown); // Reset any existing countdown
  timeLeft = minutesToDrink * 60; // Reset timer
  updateTimerDisplay();

  // Play potion sound only if it's not already playing
  if (potionAudio.paused) {
    potionAudio.currentTime = 0; // Restart from beginning
    potionAudio.play();
  }

  countdown = setInterval(() => {
    timeLeft--;
    updateTimerDisplay();
    if (timeLeft <= 0) {
      clearInterval(countdown);
      switchScreen("countdown-screen", "timesup-screen");
      stopPotionSound(); // Stop the sound when switching screens
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
    drinkCount--; // Decrease drink count by 1
    updateDrinkCountText(); // Update the text for drink count

    // Switch to the countdown screen
    switchScreen("timesup-screen", "countdown-screen");
    startCountdown();
  } else {
    // When the drink count reaches 0, switch to the potion done screen
    switchScreen("timesup-screen", "cast-spell-screen");
  }
}

function updateDrinkCountText() {
  // Update the text to show the current drink count
  const drinkCountElement = document.getElementById("drink-count-text");
  if (drinkCountElement) {
    // Adjust text based on remaining drinks
    if (drinkCount > 0) {
      drinkCountElement.innerText = `${drinkCount} more to go!`;
    } else {
      drinkCountElement.innerText = `No more to go!`;
    }
  }
}


function goToFinalScreen() {
  switchScreen("cast-spell-screen", "reward-screen");
}

// Function to switch screens
function switchScreen(hide, show) {
  const hideScreen = document.getElementById(hide);  // Use getElementById for id-based selectors
  const showScreen = document.getElementById(show);  // Use getElementById for id-based selectors

  if (!hideScreen || !showScreen) {
    console.error("Error: One of the screens does not exist.");
    return;
  }
  console.log(`Hiding ${hide} and showing ${show}`);


  hideScreen.style.display = "none";  // Hide current screen
  showScreen.style.display = "block"; // Show new screen

  if (show === "reward-screen") {
    playSound("magic-reveal.mp3");
    playSound("mixkit-fairy-glitter-867.mp3");
  }

  if (show === "cast-spell-screen") {
    playSound("mixkit-spellcaster-fairy-swoosh-1463.mp3");
  }

  if (show === "timesup-screen") {
    playSound("magic-timer.mp3");
  }

  // Make sure the drink count text is visible when switching to countdown screen
  if (show === "countdown-screen") {
    const drinkCountElement = document.getElementById("drink-count");
    if (drinkCountElement) {
      updateDrinkCountText();
      // Reset text for the next screen
      // drinkCountElement.innerText = `${drinkCount} more to go!`;
    }
  }

  // Stop potion sound when leaving countdown screen
  if (hide === "countdown-screen") {
    stopPotionSound();
  }

  function stopPotionSound() {
    if (!potionAudio.paused) {
      potionAudio.pause();
      potionAudio.currentTime = 0; // Ensure it fully resets
    }
  }


}

