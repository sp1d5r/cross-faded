import { Vector } from "../../lib/vector";
import { Entity } from "../entities";

export class Block extends Entity {
    private position: Vector;
    private size: number;
    private initialPosition: Vector;
    private active: boolean;

    constructor(x:number, y:number, size: number, canvasWidth: number) {
        super();
        /* This will initialise variables */
        this.initialPosition = new Vector(canvasWidth, y)
        this.position = new Vector(x, y);
        this.size = size;
        this.active = Math.floor(Math.random() * 100) < 10;
    }

    _initialseAgain(diff: number) {
        this.position = new Vector(this.initialPosition.getX() + diff, this.initialPosition.getY());
        this.active = Math.floor(Math.random() * 100) < 10;
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
            let diff = this.size + this.position.getX();
            this._initialseAgain(diff);
        } else {
            /* Update the elements for the player */
            this.updatePostiion(-4, 0);
        }
    }

    render(context: CanvasRenderingContext2D) {
        /* Render the changes made */
        context.fillStyle= this.active ? "rgba(255,0,0,0.05)": "rgba(255,255,255, 0.05)";
        context.fillRect(this.position.getX(), this.position.getY(), this.size, this.size);
    }
}
