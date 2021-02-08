import {Action, ActionData} from "./action-dispatcher";
import {ActionType} from "./types";

export class DeleteCharacterAction implements Action {
    readonly type: ActionType = 'DeleteCharacter';

    constructor(private start: number, private end: number) {
    }

    get data(): ActionData {
        return {
            start: this.start,
            end: this.end,
        }
    }
}