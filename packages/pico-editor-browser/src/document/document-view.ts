import './document.css';
import {DocumentModel} from "./document-model";

export class DocumentView {
    constructor(private model: DocumentModel, private el: HTMLElement) {
        el.className = 'document';
        el.innerHTML = '&lt;start typing&gt;';
    }

    public update() {
        this.el.innerHTML = '';
        for (let line of this.model.getLines()) {
            this.el.innerHTML += `<div class='document-line'>${this.escapeHTML(line)}</div>`;
        }
    }

    private escapeHTML(input:string): string {
        return input
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }
}