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
        var building = structure.resource;
        building.entryPoint = building.entryPoint || DEFAULT_POINT;
        building.sprite.size = building.sprite.size || DEFAULT_SIZE;
        building.sprite.file = building.sprite.file || this.DeriveBuildingResourceFile(building.sprite.size);

        super(structure.id, EntityType.Building, structure.resource.sprite, structure.location);
        this.structureType = structure.type;
        var entryPoint = structure.resource.entryPoint || {x:0, y:0};
        this._entry = new Point(entryPoint.x, entryPoint.y);

        if (this.structureType == StructureType.Shop) {
            this.inventory = new ShopInventory(structure.goodsType, structure.goodsQuality);
        }
    }

    DeriveBuildingResourceFile(size:ISize):ResourceFile {
        switch (size.h) {
            case 32:
                return ResourceFile.buildings_1x;
                break;
            case 64:
                return ResourceFile.buildings_2x;
                break;
            case 96:
                return ResourceFile.buildings_3x;
                break;
            case 128:
                return ResourceFile.buildings_4x;
                break;
            case 160:
                return ResourceFile.buildings_5x;
                break;
            default:
                throw new Error("Unsupported building size.");
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
        } else if ((point.x >= this.location.position.x && point.x < this.location.position.x + this.cotwItem.size.w / TILE_SIZE) &&
            (point.y >= this.location.position.y && point.y < this.location.position.y + this.cotwItem.size.h / TILE_SIZE)) {
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