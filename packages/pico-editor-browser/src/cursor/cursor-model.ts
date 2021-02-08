import {Position} from "../action/action-dispatcher";
import {DocumentModel} from "../document/document-model";

export class CursorModel {
    private position: Position;

    constructor(private document: DocumentModel) {
        this.position = {line: 0, column: 0};
    }

    public getPosition(): Position {
        return this.position;
    }

    public moveLeft() {
        this.position.column -= 1;
        if (this.position.column < 0) {
            this.position.column = 0;
        }
    }
    public moveRight() {
        this.position.column += 1;
    }
    public moveDown() {
        this.position.line += 1;
    }

    moveToBeginningOfString() {
        this.position.column = 0;
    }
}