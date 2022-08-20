export abstract class Entity {
  abstract update(): void;
  abstract render(context: CanvasRenderingContext2D): void;
}
