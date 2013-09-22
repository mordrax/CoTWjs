/// <reference path="../references.ts"/>

/**
 * Holds all the buildings in the world, each structure should have at least
 * - location for it's top right corner,
 * - dimension of building
 * - way to draw itself
 * - entry point (if there is one) and mapping to the handler when triggered
 */
class Structure extends Entity {
    _type : StructureType;
    _entry : Point;

    //constructor (name : string, type: string, entryPos : Point, startPos : Point, size : Point, offset : Point) {
    constructor (id:string, type:StructureType, entry:Point, sprite:IResource, location:WorldCoordinates) {
        super(id, EntityType.Building, sprite, location)
        this._type = type;
        this._entry = entry;
    }

    Enter() {
        throw "Not implemented exception.";
        // code called when player enters building
    }
}