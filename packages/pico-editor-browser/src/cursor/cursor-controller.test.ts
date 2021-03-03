import {CursorController} from "./cursor-controller";
import {CursorModel} from "./cursor-model";
import {DocumentModel} from "../document/document-model";

describe('CursorController', () => {
    const documentModel = new DocumentModel();
    const cursorModel = new CursorModel(documentModel);

    // todo: mock CursorView and Dispatcher
    // const c = new CursorController(cursorModel, );
});