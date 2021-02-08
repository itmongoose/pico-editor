import {Action, ActionData} from "./action-dispatcher";
import {ActionType} from "./types";

export class MoveLeftAction implements Action {
    readonly type: ActionType = 'MoveLeft';
    get data(): ActionData {
        return {};
    }
}
export class MoveRightAction implements Action {
    readonly type: ActionType = 'MoveRight';
    get data(): ActionData {
        return {};
    }
}
export class MoveUpAction implements Action {
    readonly type: ActionType = 'MoveUp';
    get data(): ActionData {
        return {};
    }
}
export class MoveDownAction implements Action {
    readonly type: ActionType = 'MoveDown';
    get data(): ActionData {
        return {};
    }
}
export class EnterAction implements Action {
    readonly type: ActionType = 'Enter';
    get data(): ActionData {
        return {};
    }
}