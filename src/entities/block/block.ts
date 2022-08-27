import { Vector } from "../../lib/vector";
import { Entity } from "../entities";
import { isDev } from "../../main";
import { Oscillator } from "../util/oscillator";

export class Block extends Entity {
  private position: Vector;
  private size: number;
  private initialPosition: Vector;
  private active: boolean;
  private probability: number;

  private alphaOscillator: Oscillator;

  constructor(x: number, y: number, size: number, canvasWidth: number) {
    super();
    /* This will initialise variables */
    this.initialPosition = new Vector(canvasWidth, y);
    this.position = new Vector(x, y);
    this.size = size;
    this.active = Math.floor(Math.random() * 100) < 2;
    this.probability = 2; /* % a tile becomes active*/

    this.alphaOscillator = new Oscillator(
      0.5,
      1 / 80,
      Math.random() * 2 * Math.PI
    );
  }

  _initialseAgain(diff: number) {
    this.position = new Vector(
      this.initialPosition.getX() + diff,
      this.initialPosition.getY()
    );
    this.probability += 2;
    this.active = Math.floor(Math.random() * 100) < this.probability;
  }

  /* Update and Render */

  getXPosition(): number {
    return this.position.getX();
  }

  getYPosition(): number {
    return this.position.getY();
  }

  updatePosition(x: number, y: number) {
    this.position.add(new Vector(x, y));
  }

  isActive() {
    return this.active;
  }

  update() {
    if (this.position.getX() < -this.size) {
      let diff = this.size + this.position.getX();
      this._initialseAgain(diff);
    } else {
      /* Update the elements for the player */
      this.updatePosition(-4, 0);
    }

    if (this.active) {
      this.alphaOscillator.update();
    }
  }

  render(context: CanvasRenderingContext2D) {
    const condition = isDev() ? this.active : true;
    if (condition) {
      /* Render the changes made */
      context.fillStyle = this.active
        ? `rgba(255,0,0,${0.5 + this.alphaOscillator.getDy()})`
        : `rgba(255,255,255, 0.05)`;
      context.fillRect(
        this.position.getX(),
        this.position.getY(),
        this.size,
        this.size
      );
    }
  }
}
