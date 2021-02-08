import {Position} from "../action/action-dispatcher";

export class DocumentModel {
    private lines: string[] = [];

    public insertText(text: string, startPosition: Position) {
        const linesToInsert = text.split('\n');

        const endChunk = [];
        for (let i = 0; i < linesToInsert.length; i +=1) {
            const currentLine = startPosition.line + i;
            const currentColumn = i === 0 ? startPosition.column : 0;
            // add new line if needed:
            if (!this.lines[currentLine]) {
                this.lines[currentLine] = '';
            }
            const targetLine = this.lines[currentLine];

            const lineChunk = linesToInsert[i];
            this.lines[currentLine] = targetLine.substring(0, currentColumn) + lineChunk;
            endChunk.push(targetLine.substring(currentColumn));

            // add the rest of the first string to the end:
            if (i === linesToInsert.length - 1) {
                this.lines[currentLine] += endChunk.join('');
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