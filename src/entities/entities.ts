export abstract class Updateable {
  abstract update(): void;
}

export abstract class Entity extends Updateable {
  abstract render(context: CanvasRenderingContext2D): void;
}
