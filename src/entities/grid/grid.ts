import { Entity } from "../entities";
import {Block} from "../block/block";

const BLOCKS_HEIGHT = 30;

export class Grid extends Entity {
  private speed: number;
  private columns: any[];
  private blockSize: number;

  constructor() {
    super();
    /* This will initialise variables and grid */
    this.speed = 0;
    this.columns = [];
    this.blockSize = this._getBlockSize();
    this.appendColumn();
  }

  _getBlockSize(): number {
    /* Generate the height and width of a block relative to the canvas size */
    const canvasHeight : number = document.getElementsByTagName("canvas")[0].clientHeight;
    return canvasHeight / BLOCKS_HEIGHT;
  }
  _setSpeed(speed: number) {
    this.speed = speed;
  }

  /* Column manipulation */
  appendColumn() {
    /* Add columns to the back of the grid */
    const block = new Block(10, 10, this.blockSize);
    this.columns.push(block);
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
    this.columns[0].render(context);
  }
}
