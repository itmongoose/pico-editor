import './cursor.css';
import {CursorModel} from "./cursor-model";

export class CursorView {
    // todo: get these values dynamically:
    private characterWidthPx = 9.6;
    private lineHeightPx = 21.5;

    constructor(private model: CursorModel, private el: HTMLElement) {
        el.className = 'blinker cursor';

    }

    public update() {
        const position = this.model.getPosition();
        this.el.style.left = `${position.column * this.characterWidthPx + 1}px`;
        this.el.style.top = `${position.line * this.lineHeightPx}px`;
    }
}