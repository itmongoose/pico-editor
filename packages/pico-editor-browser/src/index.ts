import {EditorModel} from "./editor/editor-model";
import {CursorModel} from "./cursor/cursor-model";
import {EditorView} from "./editor/editor-view";
import {CursorView} from "./cursor/cursor-view";
import {DocumentView} from "./document/document-view";
import {ActionDispatcher} from "./action/action-dispatcher";
import {TypeCharacterAction} from "./action/type-character-action";
import {DocumentController} from "./document/document-controller";
import {DocumentModel} from "./document/document-model";
import {DeleteCharacterAction} from "./action/delete-character-action";

function blockElement() {
    return document.createElement('div');
}

// dom elements:
const editorEl = blockElement();
const cursorEl = blockElement();
const documentEl = blockElement();
document.body.appendChild(editorEl);
editorEl.appendChild(cursorEl);
editorEl.appendChild(documentEl);

// models:
const editorModel = new EditorModel();
const documentModel = new DocumentModel();
const cursorModel = new CursorModel();

// views:
const editorView = new EditorView(editorModel, editorEl);
const cursorView = new CursorView(cursorModel, cursorEl);
const documentView = new DocumentView(documentModel, documentEl);

// controllers:
const documentController = new DocumentController(documentModel, documentView);

// dispatcher:
const dispatcher = new ActionDispatcher();
dispatcher.registerController(documentController);

document.body.addEventListener('keypress', (e) => {
    console.log("Keypressed", e.key, e.code);
    let action;
    switch (e.key) {
        case 'Enter':
            action = new TypeCharacterAction('\n');
            break;
        default:
            action = new TypeCharacterAction(e.key);
    }
    dispatcher.dispatch(action);
});
document.body.addEventListener('keydown', (e) => {
    if (e.key === 'Backspace') {
        const action = new DeleteCharacterAction(0, -1);
        dispatcher.dispatch(action);
    }
});