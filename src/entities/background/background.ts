import { Entity } from "../entities";

import bg from "../../images/bgs/bg 1.svg";

export class Background extends Entity {
  private images: HTMLImageElement[] = new Array();

  constructor() {
    super();

    const svg = new Image(500, 250);
    svg.src = "../images/bgs/bg 1.svg";

    this.images.push(svg);
  }

  update(): void {}

  render(context: CanvasRenderingContext2D): void {
    this.images.forEach((img) => {
      //   context.drawImage(img, 0, 500);
    });
  }
}
