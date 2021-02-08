import './cursor.css';
import {CursorModel} from "./cursor-model";

export class CursorView {
    constructor(private model: CursorModel, private el: Element) {
        el.className = 'blinker cursor';
    }
}