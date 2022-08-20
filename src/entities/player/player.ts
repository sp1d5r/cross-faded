import { Vector } from "../../lib/vector";
import { Entity } from "../entities";

export class Player extends Entity {
  private speed: Vector;

  private position: Vector;

  constructor() {
    super();
    /* This will initialise variables */

    this.position = new Vector(10, 10);
  }

  /* Update and Render */

  update() {
    /* Update the elements for the player */
  }

  render() {
    /* Render the changes made */
  }
}
