/// <reference path="../references.ts"/>

class Player extends Actor {

    constructor(id:string, coord?:WorldCoordinates) {
        super(id, Sprites.Actors.Player, coord);

        this._hp = 100;
        this._att = 4;

        Game.Input.keyboardEvent.add((ev) => {
            //        LEFT: 37,
            //        UP: 38,
            //        RIGHT: 39,
            //        DOWN: 40,
            Game.World.Move(this.id, ev.keyCode);
        });
    }
}