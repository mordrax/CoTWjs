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

    update(keycode) {
        if (keycode == Key.UP) {
            this.moveUp();
            console.log('Move up.');
        }
        if (keycode == Key.LEFT) {
            this.moveLeft();
            console.log('Move left.');
        }
        if (keycode == Key.DOWN) {
            this.moveDown();
            console.log('Move down.');
        }
        if (keycode == Key.RIGHT) {
            this.moveRight();
            console.log('Move right.');
        }
    }

}