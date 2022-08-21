import { Vector } from "../../lib/vector";
import { Entity } from "../entities";

export class Player extends Entity {
  private position: Vector;

  private radius: number;

  private oscillationAngle: number;
  private oscillationFrequency: number;
  private oscillationRadius: number;

  constructor() {
    super();
    /* This will initialise variables */

    this.position = new Vector(50, 100);

    this.radius = 10;

    this.oscillationAngle = 0;
    this.oscillationFrequency = 1 / 20;
    this.oscillationRadius = 10;
  }

  getY():number{
    return this.position.getY();
  }

  getX():number{
    return this.position.getX();
  }

  getRadius(): number {
    return this.radius;
  }

  /* Update and Render */

  update() {
    /* Update the elements for the player */

    this.oscillationAngle =
      this.oscillationAngle + 2 * Math.PI * this.oscillationFrequency;
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
