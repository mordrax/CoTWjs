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
    inventory:Inventory;

    //constructor (name : string, type: string, entryPos : Point, startPos : Point, size : Point, offset : Point) {
    constructor(structure:IStructure) {
        super(structure.id, EntityType.Building, structure.resource.sprite, structure.location);
        this.structureType = structure.type;
        this._entry = structure.resource.entryPoint;

        if (this.structureType.Shop) {
            this.inventory = new ShopInventory(structure.goodsType, structure.goodsQuality);
        }
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

enum StructurePart {
    Wall,
    Entry,
    None
}