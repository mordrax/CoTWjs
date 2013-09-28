/// <reference path="../references.ts"/>

/**
 * Base class for all living things in the game, hero, monsters, friendly npcs etc
 */
class Actor extends Entity {
    _hp : number;
    _att : number;
    _def : number;

    constructor(id: string, sprite:Resource, coord:WorldCoordinates) {
        super(id, EntityType.Actor, sprite, coord);

        this._hp = 50;
        this._att = 2;
        this._def = 1;
    }
}

