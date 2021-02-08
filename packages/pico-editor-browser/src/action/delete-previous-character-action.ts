import {Action, ActionData} from "./action-dispatcher";
import {ActionType} from "./types";

export class DeletePreviousCharacterAction implements Action {
    readonly type: ActionType = 'DeletePreviousCharacter';
    get data(): ActionData {
        return {};
    }
}