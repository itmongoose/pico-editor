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
                console.log('remove text', action.data);
                if (!action.data.startPosition || !action.data.endPosition) {
                    break;
                }
                this.model.removeText(action.data.startPosition, action.data.endPosition);
                this.view.update();
                break;
        }

        return Promise.resolve();
    }
}