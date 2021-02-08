import {Action, ActionData} from "./action-dispatcher";
import {ActionType} from "./types";

export class DeletePreviousCharacterAction implements Action {
    readonly type: ActionType = 'DeletePreviousCharacter';

    constructor() {
    }

    get data(): ActionData {
        return {};
    }
}