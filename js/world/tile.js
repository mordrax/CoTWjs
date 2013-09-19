/// <reference path="../references.ts"/>
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Tile = (function (_super) {
    __extends(Tile, _super);
    function Tile(id, sprite) {
        _super.call(this, id, EntityType.Tile, sprite);
        this.RotateAndCache = function (image, angle) {
            var offscreenCanvas = document.createElement('canvas');
            var offscreenCtx = offscreenCanvas.getContext('2d');

            var size = Math.max(image.width, image.height);
            offscreenCanvas.width = size;
            offscreenCanvas.height = size;

            offscreenCtx.translate(size / 2, size / 2);
            offscreenCtx.rotate(angle + Math.PI / 2);
            offscreenCtx.drawImage(image, -(image.width / 2), -(image.height / 2));

            return offscreenCanvas;
        };
        this.turn = 0;
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
            case "WallLitDgn":
                southWestTile = "Wall";
                break;
            case "WallDarkDgn":
                southWestTile = "Wall";
                break;
            default:
                return;
        }

        if (westTile === southWestTile) {
            if (northTile === southWestTile) {
                this.turn = 90;
            } else {
                // do nothing - no rotation required
            }
        } else if (northTile === southWestTile) {
            this.turn = 180;
        } else {
            this.turn = 270;
        }
    };
    return Tile;
})(Entity);
//# sourceMappingURL=tile.js.map
