import {Action, ActionData, Position} from "./action-dispatcher";
import {ActionType} from "./types";

export class InsertTextAction implements Action {
    public readonly type: ActionType = 'InsertText';

    constructor(private text: string, private position: Position) {
    }

    public get data(): ActionData {
        return {text: this.text, startPosition: this.position};
    }
}