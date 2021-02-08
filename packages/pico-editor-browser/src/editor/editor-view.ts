import {EditorModel} from "./editor-model";
import './editor.css';

export class EditorView {
    constructor(private model: EditorModel, private el: Element) {
        el.className = 'editor';
    }
}