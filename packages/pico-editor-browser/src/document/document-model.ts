export class DocumentModel {
    private text: string = '';

    public addCharacter(character: string) {
        this.text += character;
    }

    public slice(start: number, end: number) {
        this.text = this.text.slice(start, end);
    }

    public getText(): string {
        return this.text;
    }
}