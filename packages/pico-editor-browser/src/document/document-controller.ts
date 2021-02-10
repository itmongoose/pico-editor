import {Action, Controller} from "../action/action-dispatcher";
import {DocumentModel} from "./document-model";
import {DocumentView} from "./document-view";

export class DocumentController implements Controller {
    constructor(private model: DocumentModel, private view: DocumentView) {
    }

    executeAction(action: Action): Promise<void> {
        switch (action.type) {
            case "InsertText":
                if (!action.data.text || !action.data.startPosition) {
                    break;
                }
                this.model.insertText(action.data.text, action.data.startPosition);
                this.view.update();
                break;
            case "RemoveText":
                if (!action.data.startPosition || !action.data.endPosition) {
                    break;
                }
                this.model.removeText(action.data.startPosition, action.data.endPosition);
                this.view.update();
                break;
            case "LeftTrimLine":
                if (action.data.lineNumber === undefined || action.data.maxLength === undefined) {
                    break;
                }
                const line = this.model.getLine(action.data.lineNumber);
                if (!line) {
                    break;
                }
                for (let i = 0; i < action.data.maxLength; i+=1) {
                    if (line[i] && line[i].match(/\s/)) {
                        this.model.removeText({column: 0, line: action.data.lineNumber}, {column: 1, line: action.data.lineNumber});
                    }
                }
                this.view.update();
                break;
        }

        return Promise.resolve();
    }
}