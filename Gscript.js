const game = document.getElementById("game");
const player = document.getElementById("player");
const scoreEl = document.getElementById("score");
const livesEl = document.getElementById("lives");
const gameOverScreen = document.getElementById("gameOver");
const finalScore = document.getElementById("finalScore");

let score = 0;
let lives = 3;
let running = true;

const goodWords = [
  "Be Kind", "Support", "Respect",
  "Report Abuse", "You Matter", "Stay Strong"
];

const badWords = [
  "Loser", "Ugly", "Idiot",
  "Hate You", "Worthless"
];

document.addEventListener("mousemove", e => {
  const rect = game.getBoundingClientRect();
  let x = e.clientX - rect.left - player.offsetWidth / 2;
  x = Math.max(0, Math.min(x, rect.width - player.offsetWidth));
  player.style.left = x + "px";
});

function createItem() {
  if (!running) return;

  const item = document.createElement("div");
  item.classList.add("item");

  const isGood = Math.random() > 0.4;
  if (isGood) {
    item.classList.add("good");
    item.textContent = goodWords[Math.floor(Math.random() * goodWords.length)];
  } else {
    item.classList.add("bad");
    item.textContent = badWords[Math.floor(Math.random() * badWords.length)];
  }

  item.style.left = Math.random() * 300 + "px";
  game.appendChild(item);

  let speed = 3;

  const fall = setInterval(() => {
    item.style.top = item.offsetTop + speed + "px";

    const ir = item.getBoundingClientRect();
    const pr = player.getBoundingClientRect();

    if (ir.bottom >= pr.top && ir.left < pr.right && ir.right > pr.left) {
      if (item.classList.contains("good")) {
        score++;
        scoreEl.textContent = score;
      } else {
        lives--;
        livesEl.textContent = lives;
        if (lives === 0) endGame();
      }
      clearInterval(fall);
      item.remove();
    }

    if (item.offsetTop > 620) {
      clearInterval(fall);
      item.remove();
    }
  }, 20);
}

function endGame() {
  running = false;
  finalScore.textContent = score;
  gameOverScreen.style.display = "flex";
}

function restart() {
  score = 0;
  lives = 3;
  running = true;
  scoreEl.textContent = score;
  livesEl.textContent = lives;
  gameOverScreen.style.display = "none";
}

setInterval(createItem, 1100);