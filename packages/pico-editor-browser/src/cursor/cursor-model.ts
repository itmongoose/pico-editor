import {Position} from "../action/action-dispatcher";
import {DocumentModel} from "../document/document-model";

export class CursorModel {
    private position: Position;
    private maxColumnPosition: number | undefined = undefined;

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
        this.resetCorrectedColumnPosition();
    }
    public moveUp() {
        this.position.line -= 1;
        if (this.position.line < 0) { // move to the beginning of the line, if this is the first line in the document
            this.position.line = 0;
            this.position.column = 0;
            this.resetCorrectedColumnPosition();
        }
        this.correctColumnPosition();
    }
    public moveRight() {
        const currentLine = this.document.getLine(this.position.line);
        if (!currentLine) {
            return;
        }
        if (this.position.column < currentLine.length) {
            this.position.column += 1;
        }
        this.resetCorrectedColumnPosition();
    }
    public moveDown(forceNewLine = false) {
        const linesCount = this.document.getLinesCount();
        if (this.position.line < linesCount - 1) {
            this.position.line += 1;
        } else if (forceNewLine && this.position.line === linesCount - 1) {
            this.position.line += 1;
        } else {    // move to the end of the line, if this is the last line in the document
            const lastLine = this.document.getLine(this.position.line);
            if (!lastLine) {
                return;
            }
            this.position.column = lastLine.length;
            this.resetCorrectedColumnPosition();
            return;
        }
        this.correctColumnPosition();
    }

    public moveToBeginningOfLine() {
        this.position.column = 0;
        this.resetCorrectedColumnPosition();
    }

    public moveToEndOfLine() {
        const currentLine = this.document.getLine(this.position.line);
        if (!currentLine) {
            return;
        }
        this.position.column = currentLine.length;
        this.resetCorrectedColumnPosition();
    }

    private resetCorrectedColumnPosition() {
        this.maxColumnPosition = undefined;
    }

    private correctColumnPosition() {
        const currentLine = this.document.getLine(this.position.line);
        if (!currentLine) {
            return;
        }
        const currentLineLength = currentLine.length;
        if (currentLineLength <= this.position.column) {
            if (this.maxColumnPosition === undefined) {
                this.maxColumnPosition = this.position.column;
            }
            this.position.column = currentLineLength;
        } else if (this.maxColumnPosition !== undefined) {
            this.position.column = Math.min(this.maxColumnPosition, currentLineLength);
        }
    }
}