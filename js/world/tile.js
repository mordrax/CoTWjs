/// <reference path="../references.ts"/>
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Tile = (function (_super) {
    __extends(Tile, _super);
    function Tile(tileResource, location, solid) {
        if (typeof solid === "undefined") { solid = false; }
        _super.call(this, tileResource.name, EntityType.Tile, tileResource.sprite, location);

        this.ground = new Container();
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
                this.turn = Math.PI / 2;
            } else {
                // do nothing - no rotation required
            }
        } else if (northTile === southWestTile) {
            this.turn = Math.PI;
        } else {
            this.turn = Math.PI * 3 / 2;
        }
    };
    return Tile;
})(Entity);
//# sourceMappingURL=tile.js.map
