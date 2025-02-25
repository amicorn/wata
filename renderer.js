let drinkCount = 3;
let countdown;
let minutesToDrink = 1;
let timeLeft = minutesToDrink * 60; // convert minutes to seconds

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
    document.getElementById("drink-count").innerText = drinkCount;
    switchScreen("timesup-screen", "countdown-screen");
    startCountdown();
  } else {
    switchScreen("timesup-screen", "potion-done-screen");
  }
}

function goToFinalScreen() {
  switchScreen("potion-done-screen", "final-screen");
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
}

