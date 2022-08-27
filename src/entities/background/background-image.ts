import { Vector } from "../../lib/vector";
import { Entity } from "../entities";

export abstract class BackgroundImage extends Entity {
  protected image: HTMLImageElement;

  protected position: Vector | null = null;
  protected speed: Vector;
  protected dimensions: Vector;

  constructor(url: string, speed: Vector, dimensions: Vector) {
    super();
    this.image = new Image();

    this.image.src = url;

    this.speed = speed;
    this.dimensions = dimensions;
  }

  async onLoad(): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      this.image.onload = () => resolve(this.image);
      this.image.onerror = reject;
    });
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
}
