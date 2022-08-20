import { Entity } from "../entities";
import {Block} from "../block/block";

const BLOCKS_NUMBER = 30;

export class Grid extends Entity {
  private speed: number;
  private columns: Block[][];
  private blockSize: number;

  constructor(canvasHeight: number, canvasWidth: number) {
    super();
    /* This will initialise variables and grid */
    this.speed = 0;
    this.columns = [];
    this.blockSize = this._getBlockSize(canvasHeight);
    this.appendColumn();
  }

  _getBlockSize(canvasHeight: number): number {
    /* Generate the height and width of a block relative to the canvas size */
    let availableHeight = canvasHeight -  BLOCKS_NUMBER*2;
    return availableHeight / BLOCKS_NUMBER;
  }

  _setSpeed(speed: number) {
    this.speed = speed;
  }

  /* Column manipulation */
  appendColumn() {
    /* Add columns to the back of the grid */
    let pos = 0;
    let rows: Block[] = [];
    for (let i = 0; i < BLOCKS_NUMBER; i++) {
      const block = new Block(0, pos, this.blockSize);
      rows.push(block)
      pos += this.blockSize + 2;
    }
    this.columns.push(rows);
  }

  removeColumn() {
    /* Remove columns from the front of the grid */
  }

  /* Update and Render */

  update() {
    /* Update the elements in the grid */
  }

  render(context: CanvasRenderingContext2D) {
    /* Render the changes made */
    for (var i = 0; i < this.columns.length; i++) {
      let column = this.columns[i];
      for (var j = 0; j < column.length; j++){
        column[j].render(context);
      }
    }
  }
}
