import { Entity } from "../entities";

export class Grid extends Entity {
  private speed: number;
  private columns: any[];

  constructor() {
    super();
    /* This will initialise variables and grid */
    this.speed = 0;
    this.columns = [];
  }

  _setSpeed(speed: number) {
    this.speed = speed;
  }

  /* Column manipulation */
  appendColumn() {
    /* Add columns to the back of the grid */
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
