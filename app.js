const canvas = document.querySelector("canvas");
const canvasContext = canvas.getContext("2d");

//setting canvas size
canvas.width = 1024;
canvas.height = 576;

//fillRect takes four arguments: x position, y position, width, height
canvasContext.fillRect(0, 0, canvas.width, canvas.height);

const gravity = 0.7;

const background = new Sprite({
  position: {
    x: 0,
    y: 0,
  },
  imageSrc: "./assets/background.png",
});

const shop = new Sprite({
  position: {
    x: 630,
    y: 159,
  },
  imageSrc: "./assets/shop.png",
  scale: 2.5,
  framesMax: 6,
});

const player = new Fighter({
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
  imageSrc: "./assets/samurai/Idle.png",
  framesMax: 8,
  scale: 2.5,
  offset: {
    x: 215,
    y: 155,
  },
  sprites: {
    idle: {
      imageSrc: "./assets/samurai/Idle.png",
      framesMax: 8,
    },
    run: {
      imageSrc: "./assets/samurai/Run.png",
      framesMax: 8,
    },
    jump: {
      imageSrc: "./assets/samurai/Jump.png",
      framesMax: 2,
    },
    fall: {
      imageSrc: "./assets/samurai/Fall.png",
      framesMax: 2,
    },
  },
});

const enemy = new Fighter({
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

timerCountDown();

function animate() {
  canvasContext.fillStyle = "black";
  canvasContext.fillRect(0, 0, canvas.width, canvas.height);
  background.update();
  shop.update();
  window.requestAnimationFrame(animate);
  player.update();
  // enemy.update();

  player.velocity.x = 0;

  if (keys.a.pressed) {
    player.velocity.x = -5;
    player.switchSprite("run");
  } else if (keys.d.pressed) {
    player.velocity.x = 5;
    player.switchSprite("run");
  } else {
    player.switchSprite("idle");
  }

  if (player.velocity.y < 0) {
    player.switchSprite("jump");
  } else if (player.velocity.y > 0) {
    player.switchSprite("fall");
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
