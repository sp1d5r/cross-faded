import { Vector } from "../../lib/vector";
import { Entity } from "../entities";

abstract class BackgroundImage extends Entity {
  protected image: HTMLImageElement;

  protected position: Vector | null = null;
  protected speed: Vector;
  protected dimensions: Vector;
  protected initialPosition: Vector;

  constructor(
    url: string,
    speed: Vector,
    dimensions: Vector,
    initialPosition: Vector
  ) {
    super();
    this.image = new Image();

    this.image.src = url;

    this.speed = speed;
    this.dimensions = dimensions;
    this.initialPosition = initialPosition;
  }

  async onLoad(): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      this.image.onload = () => resolve(this.image);
      this.image.onerror = reject;
    });
  }

  initialisePosition() {
    this.position = Vector.copy(this.initialPosition);
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

export class RepeatingBackgroundImage extends BackgroundImage {
  protected repeats: number;

  constructor(
    url: string,
    speed: Vector,
    dimensions: Vector,
    initialPosition: Vector,
    canvasWidth: number
  ) {
    super(url, speed, dimensions, initialPosition);
    this.repeats = Math.ceil(canvasWidth / dimensions.getX()) + 1;
  }

  update(): void {
    if (this.position === null) return;
    // throw new Error("Update called before image loaded");
    this.position.add(this.speed);

    if (this.position.getX() <= -this.dimensions.getX()) {
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

export class SingleBackgroundImage extends BackgroundImage {
  update(): void {
    if (this.position === null) return;
    // throw new Error("Update called before image loaded");
    this.position.add(this.speed);

    if (this.position.getX() <= -this.dimensions.getX()) {
      this.initialisePosition();
    }
  }

  render(context: CanvasRenderingContext2D): void {
    if (this.position === null) return;
    // throw new Error("Update called before image loaded");
    context.drawImage(
      this.image,
      this.position.getX(),
      this.position.getY(),
      this.dimensions.getX(),
      this.dimensions.getY()
    );
  }
}
