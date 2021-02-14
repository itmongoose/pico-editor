import {DocumentModel} from "./document-model";
import * as assert from "assert";

describe('DocumentModel', () => {
    it('should insert text', () => {
        const m = new DocumentModel();
        m.insertText('test', {column: 0, line: 0});
        const line = m.getLine(0);
        assert.strictEqual(line, 'test');
    });
});