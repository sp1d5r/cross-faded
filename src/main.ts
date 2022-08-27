import "./style.css";
import { Player } from "./entities/player/player";
import { Grid } from "./entities/grid/grid";
import { Background } from "./entities/background/background";
import { Vector } from "./lib/vector";

// https://medium.com/@KevinBGreene/lets-write-a-physics-based-game-in-typescript-part-1-game-loop-and-simple-physics-4b4cbc0bbdce

const canvas: HTMLCanvasElement = document.createElement("canvas");
const context: CanvasRenderingContext2D = canvas.getContext("2d")!;
const root: HTMLElement | null = document.body;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

if (context === null || root === null) {
  throw new Error("Unable to add canvas");
}

root.appendChild(canvas);

class Game {
  start = new Date().getTime();
  player: Player = new Player();
  canvasHeight: number = canvas.height;
  canvasWidth: number = canvas.width;
  background: Background = new Background(canvas.width, canvas.height);
  grid: Grid = new Grid(this.canvasHeight, this.canvasWidth);

  constructor() {
    const player = this.player;
    const background = this.background;
    const upVector = new Vector(0, -40);
    const downVector = new Vector(0, 40);

    // TODO: only allow movement before render() is called()
    document.onkeydown = function (e) {
      switch (e.key) {
        case "ArrowUp":
          player.move(upVector);
          background.move(upVector);
          break;
        case "ArrowDown":
          player.move(downVector);
          background.move(downVector);
      }
    };
  }

  async sleep(m: number) {
    await new Promise((r) => setTimeout(r, 2000));
  }

  async tick() {
    this.player.update();
    this.grid.update();
    this.background.update();

    this.clearCanvas();

    this.background.render(context);
    this.grid.render(context);
    this.player.render(context);

    if (this.grid.checkColision(this.player)) {
      return;
    }

    requestAnimationFrame(() => this.tick());
  }

  clearCanvas(): void {
    context.clearRect(0, 0, canvas.width, canvas.height);
  }
}

const game = new Game();

requestAnimationFrame(() => {
  game.tick();
});
