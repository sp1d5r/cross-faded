import { Entity } from "../entities";
import { Vector } from "../../lib/vector";
import { BackgroundImage } from "./background-image";

export class RepeatingBackgroundImage extends BackgroundImage {
  protected repeats: number;

  constructor(
    url: string,
    speed: Vector,
    dimensions: Vector,
    canvasWidth: number
  ) {
    super(url, speed, dimensions);
    this.repeats = Math.ceil(canvasWidth / dimensions.getX()) + 1;
  }

  getDimensions() {
    return this.dimensions;
  }

  setPosition(position: Vector) {
    this.position = position;
  }

  getPosition() {
    return this.position;
  }

  update(): void {
    if (this.position === null) return;
    // throw new Error("Update called before image loaded");
    this.position.add(this.speed);

    if (this.position.getX() <= this.dimensions.getX()) {
      const diff = this.position.getX() % this.dimensions.getX();
      this.setPosition(new Vector(diff, this.position.getY()));
    }
  }

  render(context: CanvasRenderingContext2D): void {
    if (this.position === null) return;
    // throw new Error("Update called before image loaded");
    for (let i = 0; i < this.repeats; i++) {
      context.drawImage(
        this.image,
        this.position.getX() + this.dimensions.getX() * i,
        this.position.getY(),
        this.dimensions.getX(),
        this.dimensions.getY()
      );
    }
  }
}
