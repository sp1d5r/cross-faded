"use strict";
exports.__esModule = true;
var player_1 = require("./entities/player/player");
// https://medium.com/@KevinBGreene/lets-write-a-physics-based-game-in-typescript-part-1-game-loop-and-simple-physics-4b4cbc0bbdce
var canvas = document.createElement("canvas");
var context = canvas.getContext("2d");
var root = document.getElementById("root");
if (context === null || root === null) {
    throw new Error("Unable to add canvas");
}
root.appendChild(canvas);
var Game = /** @class */ (function () {
    function Game() {
        this.start = new Date().getTime();
        this.player = new player_1.Player();
    }
    Game.prototype.tick = function () {
        this.player.update();
        this.player.render();
    };
    return Game;
}());
var game = new Game();
setInterval(function () {
    console.log("running");
    game.tick();
}, 40);
