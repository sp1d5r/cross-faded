import "./style.css";
import { Player } from "./entities/player/player";
import { Grid } from "./entities/grid/grid";
import { Background } from "./entities/background/background";

// https://medium.com/@KevinBGreene/lets-write-a-physics-based-game-in-typescript-part-1-game-loop-and-simple-physics-4b4cbc0bbdce

const canvas: HTMLCanvasElement = document.createElement("canvas");
const context: CanvasRenderingContext2D = canvas.getContext("2d")!;
const root: HTMLElement | null = document.getElementById("root");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

if (context === null || root === null) {
  throw new Error("Unable to add canvas");
}

root.appendChild(canvas);

class Game {
  start = new Date().getTime();
  player: Player = new Player();
  background: Background = new Background();
  canvasHeight: number = canvas.height;
  canvasWidth: number = canvas.width;
  grid: Grid = new Grid(this.canvasHeight, this.canvasWidth);
  tick() {
    this.player.update();
    this.grid.update();
    this.background.update();

    this.clearCanvas();

    this.background.render(context);
    this.grid.render(context);
    this.player.render(context);
  }

  clearCanvas(): void {
    context.clearRect(0, 0, canvas.width, canvas.height);
  }
}

const game = new Game();

setInterval(function () {
  console.log("running");
  game.tick();
}, 40);
