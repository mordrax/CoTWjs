/// <reference path="../references.ts"/>

class Player extends NPC implements IDrawable {
    _x:number;
    _y:number;
    _$el:ZeptoCollection;
    _el:HTMLElement;

    constructor() {
        super();
        this._x = 10;
        this._y = 15;
    }

    Draw() {
        alert('Player draw not implemented');
    }

    moveLeft() {
        this._x -= 1;
    }

    moveRight() {
        this._x += 1;
    }

    moveUp() {
        this._y -= 1;
    }

    moveDown() {
        this._y += 1;
    }
}