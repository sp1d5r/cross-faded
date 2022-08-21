import { Entity } from "../entities";
import { BackgroundImage } from "./background-image";

import bg1 from "../../images/bgs/bg 1.svg";
import bg2 from "../../images/bgs/bg2.svg";
import bg3 from "../../images/bgs/bg3.svg";
import bg4 from "../../images/bgs/bg4.svg";
import bg5 from "../../images/bgs/bg5.svg";
import { Vector } from "../../lib/vector";

export class Background extends Entity {
  private images: BackgroundImage[] = new Array();

  private canvasWidth: number;
  private canvasHeight: number;

  constructor(canvasWidth: number, canvasHeight: number) {
    super();

    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;

    const bgUrls = [bg5, bg4, bg3, bg2, bg1];

    // First images displayed on screen (x position = 0)
    const firstImages: BackgroundImage[] = new Array();
    // Second images displayed on screen
    // (i.e. they start off at x-position = canvasWidth)
    const secondImages: BackgroundImage[] = new Array();

    bgUrls.forEach((bg, i) => {
      firstImages.push(
        new BackgroundImage(
          bg,
          new Vector(-(i + 1), 0),
          new Vector(canvasWidth, canvasHeight / 8)
        )
      );
      secondImages.push(
        new BackgroundImage(
          bg,
          new Vector(-(i + 1), 0),
          new Vector(canvasWidth, canvasHeight / 8)
        )
      );
      this.images.push(firstImages[i], secondImages[i]);
    });

    firstImages.forEach(async (image, i) => {
      const img: HTMLImageElement = await image.onLoad();
      image.setPosition(
        new Vector(0, (canvasHeight * (5 + (i + 1) / 2.5)) / 8)
      );
    });

    secondImages.forEach(async (image, i) => {
      const img: HTMLImageElement = await image.onLoad();
      image.setPosition(
        new Vector(canvasWidth, (canvasHeight * (5 + (i + 1) / 2.5)) / 8)
      );
    });
  }

  update(): void {
    this.images.forEach((img) => {
      img.update();
      if (
        img.getPosition() !== null &&
        img.getPosition().getX() <= -img.getDimensions().getX()
      ) {
        img.setPosition(new Vector(this.canvasWidth, img.getPosition().getY()));
      }
    });
  }

  render(context: CanvasRenderingContext2D): void {
    this.images.forEach((img) => {
      img.render(context);
    });
  }
}
