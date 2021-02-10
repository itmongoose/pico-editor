import {Action, ActionData, Position} from "./action-dispatcher";
import {ActionType} from "./types";

export class LeftTrimLineAction implements Action {
    public readonly type: ActionType = 'LeftTrimLine';

    constructor(private line: number, private maxLengthToRemove: number) {
    }

    public get data(): ActionData {
        return {lineNumber: this.line, maxLength: this.maxLengthToRemove};
    }
}