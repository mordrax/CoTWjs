/// <reference path="../references.ts"/>

class PhysicsEngine implements IState {
    _pressed : {};
    _hero : Player;
    public static LEFT = 37;
    public static UP = 38;
    public static RIGHT = 39;
    public static DOWN = 40;

    constructor (hero : Player) {
        this._hero = hero;
    }
    IsDown (keyCode) {
        return this._pressed[keyCode];
    }

    OnKeydown (event : KeyboardEvent) {
        this._pressed[event.keyCode] = true;
    }

    OnKeyup (event : KeyboardEvent) {
        this._pressed[event.keyCode] = false;
    }

    SendEvent(event) {
        // check if hero can move

        // move hero
        // _hero.moveUp/Down/etc

//        update(keycode : number) {
//            if (keycode == PhysicsEngine.UP) {
//                this.moveUp();
//                console.log('Move up.');
//            }
//            if (keycode == PhysicsEngine.LEFT) {
//                this.moveLeft();
//                console.log('Move left.');
//            }
//            if (keycode == PhysicsEngine.DOWN) {
//                this.moveDown();
//                console.log('Move down.');
//            }
//            if (keycode == PhysicsEngine.RIGHT) {
//                this.moveRight();
//                console.log('Move right.');
//            }
//        }
    }
}

