import { Entity } from "../entities";
import {
  SingleBackgroundImage,
  RepeatingBackgroundImage,
} from "./background-image";

import bg1 from "../../images/bgs/bg 1.svg";
import bg2 from "../../images/bgs/bg2.svg";
import bg3 from "../../images/bgs/bg3.svg";
import bg4 from "../../images/bgs/bg4.svg";
import bg5 from "../../images/bgs/bg5.svg";
import sky from "../../images/bgs/sky.svg";
import stars from "../../images/bgs/stars.svg";
import cloud1 from "../../images/clouds/cloud1.svg";
import cloud2 from "../../images/clouds/cloud2.svg";
import cloud3 from "../../images/clouds/cloud3.svg";
import { Vector } from "../../lib/vector";

type image = {
  update: () => void;
  render: (context: CanvasRenderingContext2D) => void;
  onLoad: () => Promise<HTMLImageElement>;
  initialisePosition: () => void;
};

export class Background extends Entity {
  private images: image[] = new Array();

  constructor(canvasWidth: number, canvasHeight: number) {
    super();

    const bgUrls = [bg5, bg4, bg3, bg2, bg1];

    this.images.push(
      new RepeatingBackgroundImage(
        sky,
        new Vector(-0.5, 0),
        new Vector(canvasWidth, canvasHeight),
        new Vector(0, 0),
        canvasWidth
      ),
      new RepeatingBackgroundImage(
        stars,
        new Vector(-0.5, 0),
        new Vector(canvasWidth / 1.5, canvasHeight / 4.5),
        new Vector(0, 10),
        canvasWidth
      ),
      new SingleBackgroundImage(
        cloud1,
        new Vector(-3, 0),
        new Vector(canvasWidth / 8, canvasHeight / 8),
        new Vector(canvasWidth, canvasHeight / 2)
      ),
      new SingleBackgroundImage(
        cloud2,
        new Vector(-2, 0),
        new Vector(canvasWidth / 10, canvasHeight / 10),
        new Vector(canvasWidth * 1.2, canvasHeight / 2.5)
      ),
      new SingleBackgroundImage(
        cloud3,
        new Vector(-1, 0),
        new Vector(canvasWidth / 16, canvasHeight / 16),
        new Vector(canvasWidth * 1.3, canvasHeight / 3)
      )
    );

    bgUrls.forEach((bg, i) => {
      this.images.push(
        new RepeatingBackgroundImage(
          bg,
          new Vector(-(i + 1), 0),
          new Vector(canvasWidth, canvasHeight / 8),
          new Vector(0, (canvasHeight * (5 + (i + 1) / 2.5)) / 8),
          canvasWidth
        )
      );
    });

    this._loadImages();
  }

  _loadImages() {
    this.images.forEach(async (image, i) => {
      await image.onLoad();
      image.initialisePosition();
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
