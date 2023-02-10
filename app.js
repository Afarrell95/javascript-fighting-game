const canvas = document.querySelector("canvas");
const canvasContext = canvas.getContext("2d");

//setting canvas size
canvas.width = 1024;
canvas.height = 576;

//fillRect takes four arguments: x position, y position, width, height
canvasContext.fillRect(0, 0, canvas.width, canvas.height);

const gravity = 0.2;

//creating the players

class Sprite {
  constructor({ position, velocity }) {
    this.position = position;
    this.velocity = velocity;
    this.height = 150;
  }

  drawSprite() {
    canvasContext.fillStyle = "red";
    canvasContext.fillRect(this.position.x, this.position.y, 50, this.height);
  }

  update() {
    this.drawSprite();
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

function animate() {
  canvasContext.fillStyle = "black";
  canvasContext.fillRect(0, 0, canvas.width, canvas.height);
  window.requestAnimationFrame(animate);
  player.update();
  enemy.update();
}

animate();
