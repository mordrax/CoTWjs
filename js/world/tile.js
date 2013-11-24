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
        var baseTile;

        switch (this.id) {
            case "PathRock":
                baseTile = "Rock";
                break;
            case "PathGrass":
                baseTile = "Grass";
                break;
            case "WaterGrass":
                baseTile = "Grass";
                break;
            case "WaterPath":
                baseTile = "Path";
                break;
            case "WallDarkDgn":
                baseTile = "DarkDgn";
                break;
            case "WallLitDgn":
                baseTile = "LitDgn";
                break;
            default:
                return;
        }

        if (westTile === baseTile) {
            if (northTile === baseTile) {
                this.turn = Math.PI * 3 / 2;
            } else {
                // do nothing - no rotation required
                this.turn = Math.PI;
            }
        } else if (northTile === baseTile) {
            this.turn = 0;
        } else {
            this.turn = Math.PI / 2;
        }
    };
    return Tile;
})(Entity);
//# sourceMappingURL=tile.js.map
