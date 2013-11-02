/// <reference path="../references.ts"/>

class Monster extends Actor {
    private _loot: string;            // maximum health points

    constructor(id:string, sprite:Resource, coord:WorldCoordinates) {
        super(id, sprite, coord);

        this._loot = "copper coins";
    }

    Move() {
        while(true) {
            //do some funky algorith to get a point
            if (Game.World.TryMove(this.id, new Point()))
                break;
        }
    }
}
