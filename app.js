const canvas = document.querySelector("canvas");
const canvasContext = canvas.getContext("2d");

//setting canvas size
canvas.width = 1024;
canvas.height = 576;

//fillRect takes four arguments: x position, y position, width, height
canvasContext.fillRect(0, 0, canvas.width, canvas.height);

const gravity = 0.7;

//creating the players

class Sprite {
  constructor({ position, velocity, color = "red", offset }) {
    this.position = position;
    this.velocity = velocity;
    this.width = 50;
    this.height = 150;
    this.lastKey;
    this.attackBox = {
      position: {
        x: this.position.x,
        y: this.position.y,
      },
      offset,
      width: 100,
      height: 50,
    };
    this.color = color;
    this.isAttacking;
    this.health = 100;
  }

  drawSprite() {
    //players
    canvasContext.fillStyle = this.color;
    canvasContext.fillRect(
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );

    //attackBox
    if (this.isAttacking) {
      canvasContext.fillStyle = "green";
      canvasContext.fillRect(
        this.attackBox.position.x,
        this.attackBox.position.y,
        this.attackBox.width,
        this.attackBox.height
      );
    }
  }

  update() {
    this.drawSprite();
    this.attackBox.position.x = this.position.x + this.attackBox.offset.x;
    this.attackBox.position.y = this.position.y;
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    if (this.position.y + this.height + this.velocity.y >= canvas.height) {
      this.velocity.y = 0;
    } else {
      this.velocity.y += gravity;
    }
  }

  attack() {
    this.isAttacking = true;
    setTimeout(() => {
      this.isAttacking = false;
    }, 100);
  }
}

const player = new Sprite({
  position: {
    x: 0,
    y: 0,
  },
  velocity: {
    x: 0,
    y: 10,
  },
  offset: {
    x: 0,
    y: 0,
  },
});

const enemy = new Sprite({
  position: {
    x: 400,
    y: 100,
  },
  velocity: {
    x: 0,
    y: 0,
  },
  color: "blue",
  offset: {
    x: -50,
    y: 0,
  },
});

console.log(player);

const keys = {
  a: {
    pressed: false,
  },
  d: {
    pressed: false,
  },
  w: {
    pressed: false,
  },
  ArrowRight: {
    pressed: false,
  },
  ArrowLeft: {
    pressed: false,
  },
  ArrowUp: {
    pressed: false,
  },
};

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

timerCountDown();

function animate() {
  canvasContext.fillStyle = "black";
  canvasContext.fillRect(0, 0, canvas.width, canvas.height);
  window.requestAnimationFrame(animate);
  player.update();
  enemy.update();

  player.velocity.x = 0;

  if (keys.a.pressed) {
    player.velocity.x = -5;
  } else if (keys.d.pressed) {
    player.velocity.x = 5;
  }

  enemy.velocity.x = 0;

  if (keys.ArrowLeft.pressed) {
    enemy.velocity.x = -5;
  } else if (keys.ArrowRight.pressed) {
    enemy.velocity.x = 5;
  }

  //check for attack collision
  if (
    detectCollision({
      rect1: player,
      rect2: enemy,
    }) &&
    player.isAttacking
  ) {
    player.isAttacking = false;
    enemy.health -= 5;
    document.querySelector(".enemy-bar").style.width = enemy.health + "%";
  }
  //enemy attack
  if (
    detectCollision({
      rect1: enemy,
      rect2: player,
    }) &&
    enemy.isAttacking
  ) {
    enemy.isAttacking = false;
    player.health -= 5;
    document.querySelector(".player-bar").style.width = player.health + "%";
  }

  if (enemy.health === 0 || player.health === 0) {
    determineWinner({ player, enemy, time });
  }
}

animate();

window.addEventListener("keydown", (event) => {
  switch (event.key) {
    case "d":
      keys.d.pressed = true;
      player.lastKey = "d";
      break;
    case "a":
      keys.a.pressed = true;
      player.lastKey = "a";
      break;
    case "w":
      keys.w.pressed = true;
      player.velocity.y = -20;
      break;
    case " ":
      player.attack();
      break;
    case "ArrowRight":
      keys.ArrowRight.pressed = true;
      enemy.lastKey = "ArrowRight";
      break;
    case "ArrowLeft":
      keys.ArrowLeft.pressed = true;
      enemy.lastKey = "ArrowLeft";
      break;
    case "ArrowUp":
      keys.ArrowUp.pressed = true;
      enemy.velocity.y = -20;
      break;
    case "/":
      enemy.attack();
      break;
  }
  console.log(event.key);
});

window.addEventListener("keyup", (event) => {
  switch (event.key) {
    case "d":
      keys.d.pressed = false;
      break;
    case "a":
      keys.a.pressed = false;
      break;
    case "w":
      keys.w.pressed = false;
      break;
    case "ArrowRight":
      keys.ArrowRight.pressed = false;
      break;
    case "ArrowLeft":
      keys.ArrowLeft.pressed = false;
      break;
    case "ArrowUp":
      keys.ArrowUp.pressed = false;
      break;
  }
  console.log(event.key);
});

//TODO:
//add start button
//add sprites
//stop animate when game ends
//create win count
//create crouchdown functionality
