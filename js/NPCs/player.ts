/// <reference path="../references.ts"/>

class Player extends Actor {
    constructor(id:string, coord?:WorldCoordinates) {
        super(id, CoTWSprites.Actors.Player, coord);

         this.hp = 1000;
         this.att = 10;

        Game.Input.keyboardEvent.add((ev) => {
            //        LEFT: 37,
            //        UP: 38,
            //        RIGHT: 39,
            //        DOWN: 40,
            Game.World.Move(this.id, ev.keyCode);
        });
    }



}