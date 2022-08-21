import { Entity } from "../entities";
import {Block} from "../block/block";

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
    this.initialseGrid();
    this.appendColumn();
  }

  _getGridWidth(): number {
    return this.canvasWidth % (this.blockSize);
  }

  initialseGrid() {
    let gridWidth = this._getGridWidth();
    let xPosition = this.canvasWidth;
    for (let cols=0; cols < gridWidth; cols++){
      this.appendColumn(xPosition)
      xPosition = xPosition + (this.blockSize+2);
    }
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
  appendColumn(xPosition ?: number) {
    let x_pos = (typeof xPosition === undefined) ? this.canvasWidth : xPosition
    /* Add columns to the back of the grid */
    let y_pos = 0;
    let tempCols = this.columns.map(function(arr) {
      return arr.slice();
    });;
    let rows: Block[] = [];
    for (let i = 0; i < BLOCKS_NUMBER; i++) {
      const block = new Block(x_pos, y_pos, this.blockSize, this.canvasWidth);
      rows.push(block)
      y_pos += this.blockSize + 2;
    }
    tempCols.push(rows)
    this.columns = tempCols;
  }

  removeColumn() {
    /* Remove columns from the front of the grid */
    let [first, ... rest] = this.columns;
    this.columns = rest;
  }


  /* Update and Render */

  update() {
    /* Update the elements in the grid */
    /* Determine how to do this with a dynamically changing array*/

    for (var i = 0; i < this.columns.length; i++) {
      let column = this.columns[i]
      for (var j = 0; j < column.length; j++){
        /* For each Block */
        let block = column[j];
        block.update();
      }
    }
  }

  render(context: CanvasRenderingContext2D) {
    /* Render the changes made */
    context.fillStyle= "rgba(255,255,255, 0.05)";
    for (var i = 0; i < this.columns.length; i++) {
      let column = this.columns[i];
      for (var j = 0; j < column.length; j++){
        column[j].render(context);
      }
    }
  }
}
