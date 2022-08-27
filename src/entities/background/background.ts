import { Entity } from "../entities";
import { RepeatingBackgroundImage } from "./repeating-background-image";

import bg1 from "../../images/bgs/bg 1.svg";
import bg2 from "../../images/bgs/bg2.svg";
import bg3 from "../../images/bgs/bg3.svg";
import bg4 from "../../images/bgs/bg4.svg";
import bg5 from "../../images/bgs/bg5.svg";
import { Vector } from "../../lib/vector";

export class Background extends Entity {
  private images: RepeatingBackgroundImage[] = new Array();

  constructor(canvasWidth: number, canvasHeight: number) {
    super();

    const bgUrls = [bg5, bg4, bg3, bg2, bg1];

    bgUrls.forEach((bg, i) => {
      this.images.push(
        new RepeatingBackgroundImage(
          bg,
          new Vector(-(i + 1), 0),
          new Vector(canvasWidth, canvasHeight / 8),
          canvasWidth
        )
      );
    });

    this.images.forEach(async (image, i) => {
      await image.onLoad();
      image.setPosition(
        new Vector(0, (canvasHeight * (5 + (i + 1) / 2.5)) / 8)
      );
    });
  }

  move(vector: Vector) {}

  update(): void {
    this.images.forEach((img) => {
      img.update();
    });
  }

  render(context: CanvasRenderingContext2D): void {
    this.images.forEach((img) => {
      img.render(context);
    });
  }
}
