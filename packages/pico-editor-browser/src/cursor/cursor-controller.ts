import {CursorModel} from "./cursor-model";
import {CursorView} from "./cursor-view";
import {Action, ActionDispatcher, Controller} from "../action/action-dispatcher";
import {InsertTextAction} from "../action/insert-text-action";
import {RemoveTextAction} from "../action/remove-text-action";
import {LeftTrimLineAction} from "../action/trim-line-action";

export class CursorController implements Controller {
    constructor(private model: CursorModel, private view: CursorView, private dispatcher: ActionDispatcher) {
    }

    executeAction(action: Action): Promise<void> {
        switch (action.type) {
            case "TypeCharacter":
                if (action.data.text) {
                    this.dispatcher.dispatch(new InsertTextAction(action.data.text, this.model.getPosition()));
                    this.model.moveRight();
                    this.view.update();
                    break;
                }
                break;
            case "DeletePreviousCharacter":
                const endPosition = {...this.model.getPosition()};
                this.model.moveLeft();
                const startPosition = {...this.model.getPosition()};
                this.dispatcher.dispatch(new RemoveTextAction(startPosition, endPosition));
                this.view.update();
                break;
            case "MoveLeft":
                this.model.moveLeft();
                this.view.update();
                break;
            case "MoveCmdLeft":
                this.model.moveToBeginningOfLine();
                this.view.update();
                break;
            case "MoveRight":
                this.model.moveRight();
                this.view.update();
                break;
            case "MoveCmdRight":
                this.model.moveToEndOfLine();
                this.view.update();
                break;
            case "MoveUp":
                this.model.moveUp();
                this.view.update();
                break;
            case "MoveDown":
                this.model.moveDown();
                this.view.update();
                break;
            case "Enter":
                let textToInsert = '\n';

                // insert same amount of whitespace as in the beginning of current line:
                const currentLine = this.model.getCurrentLine();
                if (currentLine) {
                    const whitespace = currentLine.match(/^(\s+)/);
                    if (whitespace) {
                        textToInsert += whitespace[0];
                    }
                }

                this.dispatcher.dispatch(new InsertTextAction(textToInsert, this.model.getPosition()));
                this.model.moveDown(true);

                // moving to end of line to position cursor behind possible whitespace
                this.model.moveToEndOfLine();

                this.view.update();
                break;
            case "Tab":
                const tab = '    '; // four spaces
                this.dispatcher.dispatch(new InsertTextAction('    ', this.model.getPosition()));
                for (let i = 0; i < tab.length; i+=1) {
                    this.model.moveRight();
                }
                this.view.update();
                break;
            case "ShiftTab":
                const spacesToRemove = 4;
                this.dispatcher.dispatch(new LeftTrimLineAction(this.model.getPosition().line, spacesToRemove));
                for (let i = 0; i < spacesToRemove; i+=1) {
                    this.model.moveLeft();
                }
                this.view.update();
                break;
        }

        return Promise.resolve();
    }
}