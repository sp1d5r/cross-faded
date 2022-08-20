import { Vector } from "../../lib/vector";
import { Entity } from "../entities";

export class Block extends Entity {
    private position: Vector;
    private size: number;

    constructor(x:number, y:number, size: number) {
        super();
        /* This will initialise variables */
        this.position = new Vector(x, y);
        this.size = size;
        console.log(size)
    }

    /* Update and Render */

    updatePostiion(x:number, y:number) {
        this.position.add(new Vector(x, y));
    }

    update() {
        /* Update the elements for the player */
    }

    render(context: CanvasRenderingContext2D) {
        /* Render the changes made */
        context.fillRect(this.position.getX(), this.position.getY(), this.size, this.size);
    }
}
