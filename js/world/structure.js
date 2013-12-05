/// <reference path="../references.ts"/>
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/**
* Holds all the buildings in the world, each structure should have at least
* - location for it's top right corner,
* - dimension of building
* - way to draw itself
* - entry point (if there is one) and mapping to the handler when triggered
*/
var Structure = (function (_super) {
    __extends(Structure, _super);
    //constructor (name : string, type: string, entryPos : Point, startPos : Point, size : Point, offset : Point) {
    function Structure(structure) {
        var building = structure.resource;
        building.entryPoint = building.entryPoint || DEFAULT_POINT;
        building.sprite.size = building.sprite.size || DEFAULT_SIZE;
        building.sprite.file = building.sprite.file || this.DeriveBuildingResourceFile(building.sprite.size);

        _super.call(this, structure.id, EntityType.Building, structure.resource.sprite, structure.location);
        this.structureType = structure.type;
        var entryPoint = structure.resource.entryPoint || { x: 0, y: 0 };
        this._entry = new Point(entryPoint.x, entryPoint.y);

        if (this.structureType == StructureType.Shop) {
            this.inventory = new ShopInventory(structure.goodsType, structure.goodsQuality);
        }
    }
    Structure.prototype.DeriveBuildingResourceFile = function (size) {
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
    };

    Structure.prototype.Enter = function () {
        throw "Not implemented exception.";
        // code called when player enters building
    };

    /**
    * Returns which part of the structure the given point has hit, if any
    */
    Structure.prototype.PointInStructure = function (point) {
        if (point.Equals(this._entry.Add(this.location.position))) {
            return StructurePart.Entry;
        } else if ((point.x >= this.location.position.x && point.x < this.location.position.x + this.cotwItem.size.w / TILE_SIZE) && (point.y >= this.location.position.y && point.y < this.location.position.y + this.cotwItem.size.h / TILE_SIZE)) {
            return StructurePart.Wall;
        } else {
            return StructurePart.None;
        }
    };
    return Structure;
})(Entity);

var StructurePart;
(function (StructurePart) {
    StructurePart[StructurePart["Wall"] = 0] = "Wall";
    StructurePart[StructurePart["Entry"] = 1] = "Entry";
    StructurePart[StructurePart["None"] = 2] = "None";
})(StructurePart || (StructurePart = {}));
//# sourceMappingURL=structure.js.map
