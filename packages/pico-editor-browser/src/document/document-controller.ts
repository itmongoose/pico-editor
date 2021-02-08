import {Action, Controller} from "../action/action-dispatcher";
import {DocumentModel} from "./document-model";
import {DocumentView} from "./document-view";

export class DocumentController implements Controller {
    constructor(private model: DocumentModel, private view: DocumentView) {
    }

    executeAction(action: Action): Promise<void> {
        switch (action.type) {
            case "TypeCharacter":
                if (action.data.text) {
                    this.model.addCharacter(action.data.text);
                    this.view.update();
                }
                break;
            case "DeleteCharacter":
                let start = 0, end = 0;
                if (action.data.start) {
                    start = action.data.start;
                }
                if (action.data.end) {
                    end = action.data.end;
                }
                this.model.slice(start, end);
                this.view.update();
                break;
        }

        return Promise.resolve();
    }
}