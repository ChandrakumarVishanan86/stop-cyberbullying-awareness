const mind = document.getElementById("mind");
const stressEl = document.getElementById("stress");
const gameOverScreen = document.getElementById("gameOver");
const mindArea = document.querySelector(".mind-area");

let stress = 0;
let words = [];
let running = true;

const badWords = [
  "You're useless",
  "Nobody cares",
  "You don't belong",
  "You're a joke",
  "Worthless"
];

const goodWords = [
  "You matter",
  "We support you",
  "You are strong",
  "You are not alone",
  "We are here"
];

function spawnWord() {
  if (!running) return;

  const word = document.createElement("div");
  word.classList.add("word");

  const isBad = Math.random() > 0.4;

  if (isBad) {
    word.classList.add("bad");
    word.textContent = badWords[Math.floor(Math.random() * badWords.length)];
    stress += 2;
  } else {
    word.classList.add("good");
    word.textContent = goodWords[Math.floor(Math.random() * goodWords.length)];
    stress += 0.5;
  }

  stressEl.textContent = Math.floor(stress);

  word.style.left = Math.random() * 350 + "px";
  word.style.top = Math.random() * 300 + "px";

  mindArea.appendChild(word);
  words.push(word);

  if (stress > 10) {
    mind.classList.add("damaged");
  }

  if (stress > 18) {
    endGame();
  }
}

function removeWord() {
  const bad = words.find(w => w.classList.contains("bad"));
  if (bad) {
    bad.remove();
    words = words.filter(w => w !== bad);
    stress -= 2;
  }
  updateStress();
}

function healMind() {
  stress -= 1;
  updateStress();
}

function updateStress() {
  if (stress < 0) stress = 0;
  stressEl.textContent = Math.floor(stress);

  if (stress < 10) {
    mind.classList.remove("damaged");
  }
}

function endGame() {
  running = false;
  gameOverScreen.style.display = "flex";
}

function restart() {
  stress = 0;
  words.forEach(w => w.remove());
  words = [];
  running = true;
  stressEl.textContent = stress;
  mind.classList.remove("damaged");
  gameOverScreen.style.display = "none";
}

setInterval(spawnWord, 2000);