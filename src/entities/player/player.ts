import { Vector } from "../../lib/vector";
import { Entity } from "../entities";

export class Player extends Entity {
  private position: Vector;

  private radius: number;

  private oscillationAngle: number;
  private oscillationStep: number;
  private oscillationRadius: number;

  constructor() {
    super();
    /* This will initialise variables */

    this.position = new Vector(50, 50);

    this.radius = 10;

    this.oscillationAngle = 0;
    this.oscillationStep = 20;
    this.oscillationRadius = 10;
  }

  /* Update and Render */

  update() {
    /* Update the elements for the player */

    this.oscillationAngle =
      this.oscillationAngle + (2 * Math.PI) / this.oscillationStep;
    if (this.oscillationAngle >= 2 * Math.PI) {
      this.oscillationAngle -= 2 * Math.PI;
    }

    const dy = this.oscillationRadius * Math.cos(this.oscillationAngle);

    this.position.add(new Vector(0, dy));
  }

  render(context: CanvasRenderingContext2D) {
    /* Render the changes made */
    context.fillStyle = "rgb(0, 255, 0)";

    context.beginPath();
    context.arc(
      this.position.getX(),
      this.position.getY(),
      this.radius,
      0,
      2 * Math.PI
    );
    context.closePath();
    context.fill();
  }
}
