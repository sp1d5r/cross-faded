import { Entity } from "../entities";
import { Block } from "../block/block";
import { Player } from "../player/player";

const BLOCKS_NUMBER = 30;

export class Grid extends Entity {
  private speed: number;
  private columns: Block[][];
  private blockSize: number;
  private canvasHeight: number;
  private canvasWidth: number;

  constructor(canvasHeight: number, canvasWidth: number) {
    super();
    /* This will initialise variables and grid */
    this.speed = 0;
    this.columns = [];
    this.blockSize = this.getBlockSize(canvasHeight);
    this.canvasHeight = canvasHeight;
    this.canvasWidth = canvasWidth;
    this.initialseGrid();
  }

  _getGridWidth(): number {
    return Math.floor(this.canvasWidth / (this.blockSize + 1));
  }

  initialseGrid() {
    let gridWidth = this._getGridWidth();
    console.log(gridWidth);
    let xPosition = this.canvasWidth;
    for (let cols = 0; cols < gridWidth; cols++) {
      this._appendColumn(xPosition);
      xPosition = xPosition + (this.blockSize + 2);
    }
  }

  getBlockSize(canvasHeight: number): number {
    /* Generate the height and width of a block relative to the canvas size */
    let availableHeight = canvasHeight - BLOCKS_NUMBER * 2;
    return availableHeight / BLOCKS_NUMBER;
  }

  _setSpeed(speed: number) {
    this.speed = speed;
  }

  /* Column manipulation */
  _appendColumn(xPosition?: number) {
    let x_pos = typeof xPosition === undefined ? this.canvasWidth : xPosition;
    /* Add columns to the back of the grid */
    let y_pos = 0;
    let tempCols = this.columns.map(function (arr) {
      return arr.slice();
    });
    let rows: Block[] = [];
    for (let i = 0; i < BLOCKS_NUMBER; i++) {
      const block = new Block(x_pos, y_pos, this.blockSize, this.canvasWidth);
      rows.push(block);
      y_pos += this.blockSize + 2;
    }
    tempCols.push(rows);
    this.columns = tempCols;
  }

  _calcDist(x1: number, x2: number, y1: number, y2: number): number {
    return Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);
  }

  _doesOverlap(
    playerX: number,
    playerY: number,
    playerRadius: number,
    blockX: number,
    blockY: number
  ): boolean {
    let blockSize = this.blockSize;
    let dist1 = this._calcDist(playerX, blockX, playerY, blockY);
    let dist2 = this._calcDist(playerX, blockX + blockSize, playerY, blockY);
    let dist3 = this._calcDist(playerX, blockX, playerY, blockY + blockSize);
    let dist4 = this._calcDist(
      playerX,
      blockX + blockSize,
      playerY,
      blockY + blockSize
    );
    console.log(dist1, dist2, dist3, dist4);
    return Math.min(dist1, dist2, dist3, dist4) <= playerRadius;
  }

  /* Update and Render */

  checkColision(player: Player): boolean {
    /* Check if player hit box*/
    for (var i = 0; i < this.columns.length; i++) {
      let column = this.columns[i];

      // X position of block refers to the top-left corner
      // X position of player refers to center of circle

      if (
        column[0].getXPosition() <= player.getX() + player.getRadius() &&
        column[0].getXPosition() + this.blockSize >=
          player.getX() - player.getRadius()
      ) {
        for (var j = 0; j < column.length; j++) {
          /* For each Block */
          let block = column[j];

          if (
            block.isActive() &&
            block.getYPosition() <= player.getY() + player.getRadius() &&
            block.getYPosition() + this.blockSize >=
              player.getY() - player.getRadius()
          ) {
            return true;
          }

          // /*TODO:// we can calculate which block to look in also so we don't have to do this */
          // if (
          //   block.isActive() &&
          //   this._doesOverlap(
          //     player.getX(),
          //     player.getY(),
          //     player.getRadius(),
          //     block.getXPosition(),
          //     block.getYPosition()
          //   )
          // ) {
          //   return true;
          // }
        }
      }
    }
    return false;
  }

  update() {
    /* Update the elements in the grid */
    this.columns.forEach((col) => {
      col.forEach((block) => block.update());
    });
  }

  render(context: CanvasRenderingContext2D) {
    /* Render the changes made */
    this.columns.forEach((col) => {
      col.forEach((block) => block.render(context));
    });
  }
}
