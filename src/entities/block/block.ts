import { Vector } from "../../lib/vector";
import { Entity } from "../entities";

export class Block extends Entity {
    private position: Vector;
    private size: number;
    private initialPosition: Vector;

    constructor(x:number, y:number, size: number) {
        super();
        /* This will initialise variables */
        this.initialPosition = new Vector(x, y)
        this.position = new Vector(x, y);
        this.size = size;
    }

    /* Update and Render */

    getXPosition(): number {
        return this.position.getX()
    }

    getYPosition(): number {
        return this.position.getY()
    }

    updatePostiion(x:number, y:number) {
        this.position.add(new Vector(x, y));
    }

    update() {
        if (this.position.getX() < - this.size){
            console.log(this.initialPosition)
            this.position = new Vector(this.initialPosition.getX(), this.initialPosition.getY());
        }
        /* Update the elements for the player */
        this.updatePostiion(-5, 0);
    }

    render(context: CanvasRenderingContext2D) {
        /* Render the changes made */
        context.fillRect(this.position.getX(), this.position.getY(), this.size, this.size);
    }
}
