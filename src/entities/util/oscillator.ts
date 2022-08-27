import { Updateable } from "../entities";

export class Oscillator extends Updateable {
  private radius: number;
  private frequency: number;
  private angle: number;

  constructor(radius: number, frequency: number, initialAngle: number) {
    super();
    this.radius = radius;
    this.frequency = frequency;
    this.angle = initialAngle;
  }

  update(): void {
    this.angle = this.angle + 2 * Math.PI * this.frequency;
    if (this.angle >= 2 * Math.PI) {
      this.angle -= 2 * Math.PI;
    }
  }

  getDy(): number {
    return this.radius * Math.cos(this.angle);
  }
}
