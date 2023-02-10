const canvas = document.querySelector("canvas");
const canvasContext = canvas.getContext("2d");

//setting canvas size
canvas.width = 1024;
canvas.height = 576;

//fillRect takes four arguments: x position, y position, width, height
canvasContext.fillRect(0, 0, canvas.width, canvas.height);

const gravity = 0.35;

//creating the players

class Sprite {
  constructor({ position, velocity }) {
    this.position = position;
    this.velocity = velocity;
    this.height = 150;
    this.lastKey;
  }

  drawSprite() {
    canvasContext.fillStyle = "red";
    canvasContext.fillRect(this.position.x, this.position.y, 50, this.height);
  }

  update() {
    this.drawSprite();
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    if (this.position.y + this.height + this.velocity.y >= canvas.height) {
      this.velocity.y = 0;
    } else {
      this.velocity.y += gravity;
    }
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

function animate() {
  canvasContext.fillStyle = "black";
  canvasContext.fillRect(0, 0, canvas.width, canvas.height);
  window.requestAnimationFrame(animate);
  player.update();
  enemy.update();

  player.velocity.x = 0;

  if (keys.a.pressed) {
    player.velocity.x = -1;
  } else if (keys.d.pressed) {
    player.velocity.x = 1;
  }

  enemy.velocity.x = 0;

  if (keys.ArrowLeft.pressed) {
    enemy.velocity.x = -1;
  } else if (keys.ArrowRight.pressed) {
    enemy.velocity.x = 1;
  }
}

let lastKey;

animate();

window.addEventListener("keydown", (event) => {
  switch (event.key) {
    case "d":
      keys.d.pressed = true;
      lastKey = "d";
      break;
    case "a":
      keys.a.pressed = true;
      lastKey = "a";
      break;
    case "w":
      keys.w.pressed = true;
      player.velocity.y = -10;
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
      enemy.velocity.y = -10;
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
