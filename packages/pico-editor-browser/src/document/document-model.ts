import {Position} from "../action/action-dispatcher";

export class DocumentModel {
    private lines: string[] = [];

    public insertText(text: string, startPosition: Position) {
        const linesToInsert = text.split('\n');

        // create a line if it doesn't exist
        if (!this.lines[startPosition.line]) {
            this.lines[startPosition.line] = '';
        }

        const endChunk = this.lines[startPosition.line].substring(startPosition.column);
        for (let i = 0; i < linesToInsert.length; i +=1) {
            const currentLine = startPosition.line + i;
            const currentColumn = i === 0 ? startPosition.column : 0;

            // first line: append the inserted line to the end
            if (i === 0) {
                this.lines[currentLine] = this.lines[currentLine].substring(0, currentColumn) + linesToInsert[i];
            }

            // following lines: insert them as new lines
            if (i > 0) {
                this.lines.splice(currentLine, 0, linesToInsert[i]);
            }

            // last line: append the end chunk of the original line to the end
            if (i === linesToInsert.length - 1) {
                this.lines[currentLine] += endChunk;
            }
        }
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

    public getLinesCount(): number {
        return this.lines.length;
    }

    public getLine(index:number): string | undefined {
        return this.lines[index];
    }
}