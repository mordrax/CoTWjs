/// <reference path="../references.ts"/>

/**
 * Holds all the buildings in the world, each structure should have at least
 * - location for it's top right corner,
 * - dimension of building
 * - way to draw itself
 * - entry point (if there is one) and mapping to the handler when triggered
 */
class Structure extends Entity {
    structureType:StructureType;
    _entry:Point;

    //constructor (name : string, type: string, entryPos : Point, startPos : Point, size : Point, offset : Point) {
    constructor(id:string, type:StructureType, entry:Point, sprite:Resource, location:WorldCoordinates) {
        super(id, EntityType.Building, sprite, location);
        this.structureType = type;
        this._entry = entry;
    }

    IsShop():boolean {
        return (this.id.indexOf('Sage') !== -1) ||
            (this.id.indexOf('Store') !== -1) ||
            (this.id.indexOf('Blacksmith') !== -1);
    }

    Enter() {
        throw "Not implemented exception.";
        // code called when player enters building
    }

    /**
     * Returns which part of the structure the given point has hit, if any
     */
    public PointInStructure(point:Point):StructurePart {
        if (point.Equals(this._entry.Add(this.location.position))) {
            return StructurePart.Entry;
        } else if ((point.X >= this.location.position.X && point.X < this.location.position.X + this.sprite.size.w / TILE_SIZE) &&
            (point.Y >= this.location.position.Y && point.Y < this.location.position.Y + this.sprite.size.h / TILE_SIZE)) {
            return StructurePart.Wall;
        } else {
            return StructurePart.None;
        }
    }
}

class Shop extends Structure {
    public inventory:ShopInventory;

    constructor(id:string, type:StructureType, entry:Point, sprite:Resource, location:WorldCoordinates, inventory:ShopInventory) {
        super(id, type, entry, sprite, location);
        this.inventory = inventory;
    }
}


enum StructurePart {
    Wall,
    Entry,
    None
}