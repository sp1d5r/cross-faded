import { Player } from "./entities/player/player";

// https://medium.com/@KevinBGreene/lets-write-a-physics-based-game-in-typescript-part-1-game-loop-and-simple-physics-4b4cbc0bbdce

const canvas: HTMLCanvasElement = document.createElement("canvas");
const context: CanvasRenderingContext2D | null = canvas.getContext("2d");
const root: HTMLElement = document.getElementById("root");

if (context === null || root === null) {
  throw new Error("Unable to add canvas");
}

root.appendChild(canvas);

class Game {
  start = new Date().getTime();
  player: Player = new Player();

  tick() {
    this.player.update();

    this.player.render();
  }
}

const game = new Game();

setInterval(function () {
  console.log("running");
  game.tick();
}, 40);
