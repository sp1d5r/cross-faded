import { Entity } from "../entities";

import Bg from "../../images/bgs/bg 1.svg";

export class Background extends Entity {
  private svgs: Path2D[] = new Array();
  private images: HTMLImageElement[] = new Array();

  constructor() {
    super();

    const img = new Image();
    img.src = Bg;
    console.log(img.width);

    this.images.push(img);
  }

  update(): void {}

  render(context: CanvasRenderingContext2D): void {
    this.images.forEach((img) => {
      context.drawImage(img, 200, 300, 500, 200);
    });
  }
}
