import {ActionType} from "./types";

export interface ActionData {
    text?: string;
    start?: number;
    end?: number;
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