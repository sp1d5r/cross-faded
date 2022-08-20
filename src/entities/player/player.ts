import { Vector } from "../../lib/vector";
import { Entity } from "../entities";

export class Player extends Entity {
  private speed: Vector;

  private position: Vector;

  constructor() {
    super();
    /* This will initialise variables */

    this.position = new Vector(10, 10);
    this.speed = new Vector(5, 0);
  }

  /* Update and Render */

  update() {
    /* Update the elements for the player */
    this.position.add(this.speed);
  }

  render(context: CanvasRenderingContext2D) {
    /* Render the changes made */
    context.fillStyle = "rgb(0, 255, 0)";

    context.beginPath();
    context.arc(this.position.getX(), this.position.getY(), 30, 0, 2 * Math.PI);
    context.closePath();
    context.fill();
  }
}
