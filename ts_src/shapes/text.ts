import Shape from "./shape";
import BoundingRect from "./boundingrect";
import { GlobalPoint } from "../geom";
import { g2l } from "../units";
import { ServerText } from "../api_types";

export default class Text extends Shape {
    type = "text";
    text: string;
    font: string;
    angle: number;
    constructor(position: GlobalPoint, text: string, font: string, angle?: number, uuid?: string) {
        super(position, uuid);
        this.text = text;
        this.font = font;
        this.angle = angle || 0;
    }
    asDict() {
        return Object.assign(this.getBaseDict(), {
            text: this.text,
            font: this.font,
            angle: this.angle
        })
    }
    getBoundingBox(): BoundingRect {
        return new BoundingRect(this.refPoint, 5, 5); // Todo: fix this bounding box
    }
    draw(ctx: CanvasRenderingContext2D) {
        super.draw(ctx);
        ctx.font = this.font;
        ctx.save();
        const dest = g2l(this.refPoint);
        ctx.translate(dest.x, dest.y);
        ctx.rotate(this.angle);
        ctx.textAlign = "center";
        ctx.fillText(this.text, 0, -5);
        ctx.restore();
    }
    contains(point: GlobalPoint): boolean {
        return false; // TODO
    }

    center(): GlobalPoint;
    center(centerPoint: GlobalPoint): void;
    center(centerPoint?: GlobalPoint): GlobalPoint | void { } // TODO
    getCorner(point: GlobalPoint): string|undefined { return "" }; // TODO
    visibleInCanvas(canvas: HTMLCanvasElement): boolean { return true; } // TODO
}