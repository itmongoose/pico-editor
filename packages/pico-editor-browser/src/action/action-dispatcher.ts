import {ActionType} from "./types";

export interface Position {
    line: number;
    column: number;
}

export interface ActionData {
    text?: string;
    start?: number;
    end?: number;
    startPosition?: Position;
    endPosition?: Position;
    lineNumber?: number;
    maxLength?: number;
}

export interface Action {
    readonly type: ActionType;
    readonly data: ActionData;
}
export interface Controller {
    executeAction(action: Action): Promise<void>;
}

export class ActionDispatcher {
    private controllers: Controller[] = [];

    public registerController(controller: Controller) {
        this.controllers.push(controller);
    }

    public dispatch(action: Action) {
        this.controllers.forEach(c => c.executeAction(action));
    }
}