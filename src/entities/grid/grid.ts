import { Entity } from "../entities";
import {Block} from "../block/block";

export class Grid extends Entity {
  private speed: number;
  private columns: any[];

  constructor() {
    super();
    /* This will initialise variables and grid */
    this.speed = 0;
    this.columns = [];
    this.appendColumn();
  }

  _setSpeed(speed: number) {
    this.speed = speed;
  }

  /* Column manipulation */
  appendColumn() {
    /* Add columns to the back of the grid */
    const block = new Block(10, 10);
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
  }
}
