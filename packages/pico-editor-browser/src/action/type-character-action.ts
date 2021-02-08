import {Action, ActionData} from "./action-dispatcher";
import {ActionType} from "./types";

export class TypeCharacterAction implements Action {
    public readonly type: ActionType = 'TypeCharacter';

    constructor(private character: string) {
    }

    public get data(): ActionData {
        return {text: this.character};
    }
}