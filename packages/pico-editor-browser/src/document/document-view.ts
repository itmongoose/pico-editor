import './document.css';
import {DocumentModel} from "./document-model";

export class DocumentView {
    constructor(private model: DocumentModel, private el: HTMLElement) {
        el.className = 'document';
        el.innerHTML = '&lt;start typing&gt;';
    }

    public update() {
        this.el.innerText = this.model.getText();
    }
}