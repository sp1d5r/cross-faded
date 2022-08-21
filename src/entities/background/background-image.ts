import { Entity } from "../entities";
import { Vector } from "../../lib/vector";

export class BackgroundImage extends Entity {
  private image: HTMLImageElement;

  private position: Vector = null;
  private speed: Vector;
  private dimensions: Vector;

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

  update(): void {
    if (this.position === null)
      throw new Error("Update called before image loaded");
    this.position.add(this.speed);
  }

  render(context: CanvasRenderingContext2D): void {
    if (this.position === null)
      throw new Error("Update called before image loaded");
    context.drawImage(
      this.image,
      this.position.getX(),
      this.position.getY(),
      this.dimensions.getX(),
      this.dimensions.getY()
    );
  }
}
