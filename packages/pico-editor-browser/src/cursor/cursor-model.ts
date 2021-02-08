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
    public moveUp() {
        this.position.line -= 1;
        if (this.position.line < 0) {
            this.position.line = 0;
        }
    }
    public moveRight() {
        const currentLine = this.document.getLine(this.position.line);
        if (!currentLine) {
            return;
        }
        if (this.position.column < currentLine.length) {
            this.position.column += 1;
        }
    }
    public moveDown(forceNewLine = false) {
        const linesCount = this.document.getLinesCount();
        if (this.position.line < linesCount - 1) {
            this.position.line += 1;
        } else if (forceNewLine && this.position.line === linesCount - 1) {
            this.position.line += 1;
        }
    }

    moveToBeginningOfString() {
        this.position.column = 0;
    }
}