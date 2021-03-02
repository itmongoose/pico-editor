import {DocumentModel} from "./document-model";
import * as assert from "assert";

describe('DocumentModel', () => {
    const m = new DocumentModel();

    it('should insert a word at the beginning of the document', () => {
        m.insertText('The', {column: 0, line: 0});
        const line = m.getLine(0);
        assert.strictEqual(line, 'The');
    });
    it('should insert a few words at the given position', () => {
        m.insertText(' quick brown fox', {column: 4, line: 0});
        const line = m.getLine(0);
        assert.strictEqual(line, 'The quick brown fox');
    });
    it('should insert a new line and add words to it', () => {
        m.insertText('\n', {column: 19, line: 0});
        m.insertText('jumps over', {column: 0, line: 1});
        const line1 = m.getLine(0);
        const line2 = m.getLine(1);
        assert.strictEqual(line1, 'The quick brown fox');
        assert.strictEqual(line2, 'jumps over');
    });
    it('should insert break a line into new lines', () => {
        m.insertText('lazy dog\n', {column: 4, line: 0});
        assert.strictEqual(m.getLinesCount(), 3);
        const line1 = m.getLine(0);
        const line2 = m.getLine(1);
        const line3 = m.getLine(2);
        assert.strictEqual(line1, 'The lazy dog');
        assert.strictEqual(line2, 'quick brown fox');
        assert.strictEqual(line3, 'jumps over');
    });
});