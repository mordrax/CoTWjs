/// <reference path="../references.ts"/>

/**
 * Base class for all living things in the game, hero, monsters, friendly npcs etc
 */
class Actor extends Entity {
    constructor(id: string, sprite:IResource, coord?:WorldCoordinates) {
        super(id, EntityType.Actor, sprite, coord);
    }
}

