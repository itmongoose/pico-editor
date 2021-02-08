import {Position} from "../action/action-dispatcher";

export class DocumentModel {
    private lines: string[] = [];

    public insertText(text: string, position: Position) {
        if (!this.lines[position.line]) {
            this.lines[position.line] = '';
        }
        const targetLine = this.lines[position.line];
        this.lines[position.line] = targetLine.substring(0, position.column) + text + targetLine.substring(position.column);
    }

    public removeText(start: Position, end: Position) {
        const linesToRemove: number[] = [];
        for (let line = start.line; line <= end.line + 1; line += 1) {
            if (line === start.line) {
                if (line === end.line) {
                    this.lines[line] = this.lines[line].substring(0, start.column) + this.lines[line].substring(end.column);
                    break;
                }
                this.lines[line] = this.lines[line].substring(0, start.column);
            } else if (line === end.line) {
                this.lines[line] = this.lines[line].substr(end.column, 0);
                break;
            } else {
                linesToRemove.push(line);
            }
        }
        for (let line of linesToRemove) {
            this.lines.splice(line, 1);
        }
    }

    public getLines(): string[] {
        return this.lines;
    }

    public getLine(index:number): string | undefined {
        return this.lines[index];
    }
}