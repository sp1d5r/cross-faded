import { Vector } from "../../lib/vector";
import { Entity } from "../entities";
import { Oscillator } from "../util/oscillator";

export class Player extends Entity {
  private position: Vector;

  private radius: number;

  private oscillator: Oscillator;

  constructor() {
    super();
    /* This will initialise variables */

    this.position = new Vector(50, 100);

    this.radius = 10;

    this.oscillator = new Oscillator(5, 1 / 20, 0);
  }

  getY(): number {
    return this.position.getY();
  }

  getX(): number {
    return this.position.getX();
  }

  getRadius(): number {
    return this.radius;
  }

  move(vector: Vector) {
    this.position.add(vector);
  }

  /* Update and Render */

  update() {
    /* Update the elements for the player */
    this.oscillator.update();

    this.move(new Vector(0, this.oscillator.getDy()));
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
