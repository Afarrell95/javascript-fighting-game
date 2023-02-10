const canvas = document.querySelector("canvas");
const canvasContext = canvas.getContext("2d");

canvas.width = 1024;
canvas.height = 576;

//fillRect takes four arguments: x position, y position, width, height
canvasContext.fillRect(0, 0, canvas.width, canvas.height);
