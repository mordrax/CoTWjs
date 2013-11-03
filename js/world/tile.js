/// <reference path="../references.ts"/>
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Tile = (function (_super) {
    __extends(Tile, _super);
    function Tile(id, sprite, location) {
        _super.call(this, id, EntityType.Tile, sprite, location);
    }
    Tile.prototype.DetermineRotation = function (westTile, northTile) {
        var southWestTile;

        switch (this.id) {
            case "PathRock":
                southWestTile = "Path";
                break;
            case "PathGrass":
                southWestTile = "Path";
                break;
            case "WaterGrass":
                southWestTile = "Water";
                break;
            case "WaterPath":
                southWestTile = "Water";
                break;
            default:
                return;
        }

        if (westTile === southWestTile) {
            if (northTile === southWestTile) {
                this.sprite.turn = Math.PI / 2;
            } else {
                // do nothing - no rotation required
            }
        } else if (northTile === southWestTile) {
            this.sprite.turn = Math.PI;
        } else {
            this.sprite.turn = Math.PI * 3 / 2;
        }
    };
    return Tile;
})(Entity);
//# sourceMappingURL=tile.js.map
