import {Action, ActionData, Position} from "./action-dispatcher";
import {ActionType} from "./types";

export class RemoveTextAction implements Action {
    public readonly type: ActionType = 'RemoveText';

    constructor(private startPosition: Position, private endPosition: Position) {
    }

    public get data(): ActionData {
        return {startPosition: this.startPosition, endPosition: this.endPosition};
    }
}