import { Vector } from "../../lib/vector";
import { Entity } from "../entities";

const canvas: HTMLCanvasElement = document.createElement("canvas");
const context: CanvasRenderingContext2D | null = canvas.getContext("2d");

export class Block extends Entity {
    private position: Vector;

    constructor(x:number, y:number) {
        super();
        /* This will initialise variables */
        this.position = new Vector(x, y);
        context.fillStyle = "rgb(0, 0, 0)";
        context.beginPath();
        context.fillRect(this.position.getX(), this.position.getY(), 1000, 1000);
        context.closePath();
        context.fill();
        console.log("here")
    }

    /* Update and Render */

    updatePostiion(x:number, y:number) {
        this.position.add(new Vector(x, y));
    }

    update() {
        /* Update the elements for the player */
    }

    render() {
        /* Render the changes made */
    }
}
