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
    function Structure(id, type, entry, sprite, location) {
        _super.call(this, id, EntityType.Building, sprite, location);
        this._type = type;
        this._entry = entry;
    }
    Structure.prototype.StructureType = function () {
        return this._type;
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
        } else if ((point.X >= this.location.position.X && point.X < this.location.position.X + this.sprite.size.w / TILE_SIZE) && (point.Y >= this.location.position.Y && point.Y < this.location.position.Y + this.sprite.size.h / TILE_SIZE)) {
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
