import { Entity } from "../entities";
import { Block } from "../block/block";

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
    this.blockSize = this._getBlockSize(canvasHeight);
    this.canvasHeight = canvasHeight;
    this.canvasWidth = canvasWidth;
    this.appendColumn();
  }

  _getBlockSize(canvasHeight: number): number {
    /* Generate the height and width of a block relative to the canvas size */
    let availableHeight = canvasHeight - BLOCKS_NUMBER * 2;
    return availableHeight / BLOCKS_NUMBER;
  }

  _setSpeed(speed: number) {
    this.speed = speed;
  }

  /* Column manipulation */
  appendColumn() {
    /* Add columns to the back of the grid */
    let y_pos = 0;
    let x_pos = this.canvasWidth;
    console.log();
    let rows: Block[] = [];
    for (let i = 0; i < BLOCKS_NUMBER; i++) {
      const block = new Block(x_pos, y_pos, this.blockSize);
      rows.push(block);
      y_pos += this.blockSize + 2;
    }
    this.columns.push(rows);
  }

  removeColumn() {
    /* Remove columns from the front of the grid */
  }

  /* Update and Render */

  update() {
    /* Update the elements in the grid */
    for (var i = 0; i < this.columns.length; i++) {
      let column = this.columns[i];
      for (var j = 0; j < column.length; j++) {
        /* For each Block */
        let block = column[j];
        block.update();
      }
    }
  }

  render(context: CanvasRenderingContext2D) {
    context.fillStyle = "rgb(0, 0, 255)";
    /* Render the changes made */
    for (var i = 0; i < this.columns.length; i++) {
      let column = this.columns[i];
      for (var j = 0; j < column.length; j++) {
        column[j].render(context);
      }
    }
  }
}
