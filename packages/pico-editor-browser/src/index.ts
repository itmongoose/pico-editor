import {EditorModel} from "./editor/editor-model";
import {CursorModel} from "./cursor/cursor-model";
import {EditorView} from "./editor/editor-view";
import {CursorView} from "./cursor/cursor-view";
import {DocumentView} from "./document/document-view";
import {ActionDispatcher} from "./action/action-dispatcher";
import {TypeCharacterAction} from "./action/type-character-action";
import {DocumentController} from "./document/document-controller";
import {DocumentModel} from "./document/document-model";
import {DeletePreviousCharacterAction} from "./action/delete-previous-character-action";
import {CursorController} from "./cursor/cursor-controller";
import {MoveDownAction, MoveLeftAction, MoveRightAction, MoveUpAction} from "./action/keyboard-actions";

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
const cursorModel = new CursorModel(documentModel);

// views:
const editorView = new EditorView(editorModel, editorEl);
const cursorView = new CursorView(cursorModel, cursorEl);
const documentView = new DocumentView(documentModel, documentEl);

// dispatcher:
const dispatcher = new ActionDispatcher();

// controllers:
const cursorController = new CursorController(cursorModel, cursorView, dispatcher);
const documentController = new DocumentController(documentModel, documentView);
dispatcher.registerController(cursorController);
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
    console.log("keydown", e.key, e.code);
    if (e.key === 'Backspace') {
        const action = new DeletePreviousCharacterAction();
        dispatcher.dispatch(action);
    }
    if (e.key === 'ArrowLeft') {
        const action = new MoveLeftAction();
        dispatcher.dispatch(action);
    }
    if (e.key === 'ArrowRight') {
        const action = new MoveRightAction();
        dispatcher.dispatch(action);
    }
    if (e.key === 'ArrowUp') {
        const action = new MoveUpAction();
        dispatcher.dispatch(action);
    }
    if (e.key === 'ArrowDown') {
        const action = new MoveDownAction();
        dispatcher.dispatch(action);
    }
});