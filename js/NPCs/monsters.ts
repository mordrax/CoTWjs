/// <reference path="../references.ts"/>

class Monster extends Actor {
    private _loot: string;            // maximum health points

    constructor(id:string, sprite:Resource, coord:WorldCoordinates) {
        super(id, sprite, coord);

        this._loot = "copper coins";
    }


}
