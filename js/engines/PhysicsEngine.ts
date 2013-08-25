/// <reference path="../references.ts"/>

class PhysicsEngine implements IState {
    _pressed : {};
    _hero : Player;
    _world : World;


    constructor (hero : Player, world : World) {
        this._hero = hero;
        this._world = world;
    }

    Move(actor : Actor, keycode : number) {
        var curPos = actor.GetPosition();
        var newPos : Point;
        if (keycode == KeyCodes.UP) {
            newPos = new Point(curPos.X, curPos.Y-1)
        } else if (keycode == KeyCodes.LEFT) {
            newPos = new Point(curPos.X-1, curPos.Y)
        } else if (keycode == KeyCodes.DOWN) {
            newPos = new Point(curPos.X, curPos.Y+1)
        } else if (keycode == KeyCodes.RIGHT) {
            newPos = new Point(curPos.X+1, curPos.Y)
        }        
    }

    SendEvent(event) {
        // check if hero can move

        // move hero
        // _hero.moveUp/Down/etc

//        update(keycode : number) {
//
//        }
    }
}

class KeyCodes {
    public static LEFT = 37;
    public static UP = 38;
    public static RIGHT = 39;
    public static DOWN = 40;
}
