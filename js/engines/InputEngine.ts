/// <reference path="../references.ts"/>

class InputEngine {
    keyboardEvent : Signal;

    constructor() {
        document.addEventListener("keyup", (evt : KeyboardEvent) => this.KeyEvent(evt), false);
        this.keyboardEvent = new Signal();
    }

    private KeyEvent(ev : KeyboardEvent ) {
        this.keyboardEvent.dispatch(ev);
    }
}