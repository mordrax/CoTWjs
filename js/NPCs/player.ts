/// <reference path="../references.ts"/>

class Player extends Actor {

    constructor(id:string, coord?:WorldCoordinates) {
        super(id, new Sprite(Sprites.Player, new Point(0,0)), coord);

        Game.Input.keyboardEvent.add((ev) => {
            //        LEFT: 37,
            //        UP: 38,
            //        RIGHT: 39,
            //        DOWN: 40,
            Game.World.Move(this.id, ev.keyCode);
        });
    }
}