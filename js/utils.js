function detectCollision({ rect1, rect2 }) {
  return (
    rect1.attackBox.position.x + rect1.attackBox.width >= rect2.position.x &&
    rect1.attackBox.position.x <= rect2.position.x + rect2.width &&
    rect1.attackBox.position.y + rect1.attackBox.height >= rect2.position.y &&
    rect1.attackBox.position.y <= rect2.position.y + rect2.height
  );
}

let results = document.querySelector(".win-results");

function determineWinner({ player, enemy, time }) {
  clearTimeout(time);
  results.style.display = "flex";
  if (player.health === enemy.health) {
    results.innerHTML = "Tie!";
  } else if (player.health > enemy.health) {
    results.innerHTML = "Player 1 wins!";
  } else if (enemy.health > player.health) {
    results.innerHTML = "Player 2 wins!";
  }
}

let timer = 20;
let time;
function timerCountDown() {
  time = setTimeout(timerCountDown, 1000);
  if (timer > 0) {
    timer--;
    document.querySelector(".timer").innerHTML = timer;
  } else {
    determineWinner({ player, enemy, time });
  }
}
