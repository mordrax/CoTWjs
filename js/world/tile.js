/// <reference path="../references.ts"/>
var TileType;
(function (TileType) {
    TileType[TileType["Ground"] = 0] = "Ground";
    TileType[TileType["Water"] = 1] = "Water";
    TileType[TileType["Solid"] = 2] = "Solid";
    TileType[TileType["Entry"] = 3] = "Entry";
})(TileType || (TileType = {}));

var TileData = (function () {
    function TileData(name, type, xOffset, yOffset) {
        this._name = name;
        this._type = type;
        this._turn = 0;
        this.xOffset = xOffset;
        this.yOffset = yOffset;
    }
    return TileData;
})();

var TILE_DATA;
TILE_DATA = new collections.Dictionary();

TILE_DATA.setValue('^', new TileData("Rock", TileType.Solid, 0, 0));
TILE_DATA.setValue(',', new TileData("Grass", TileType.Ground, 0, 32));
TILE_DATA.setValue('o', new TileData("DarkDgn", TileType.Ground, 0, 64));
TILE_DATA.setValue('~', new TileData("Water", TileType.Water, 0, 96));
TILE_DATA.setValue('.', new TileData("Path", TileType.Ground, 0, 128));
TILE_DATA.setValue('O', new TileData("LitDgn", TileType.Ground, 0, 160));
TILE_DATA.setValue('_', new TileData("PathRock", TileType.Solid, 32, 0));
TILE_DATA.setValue(';', new TileData("PathGrass", TileType.Ground, 32, 32));
TILE_DATA.setValue(' ', new TileData("WallDarkDgn", TileType.Solid, 32, 64));
TILE_DATA.setValue(' ', new TileData("WaterGrass", TileType.Water, 32, 96));
TILE_DATA.setValue(' ', new TileData("WaterPath", TileType.Water, 32, 128));
TILE_DATA.setValue(' ', new TileData("WallLitDgn", TileType.Solid, 32, 160));
TILE_DATA.setValue(' ', new TileData("50Grass50Cave", TileType.Solid, 0, 192));
TILE_DATA.setValue(' ', new TileData("10Grass90Cave", TileType.Solid, 32, 192));
TILE_DATA.setValue(' ', new TileData("50White50Cave", TileType.Solid, 0, 224));
TILE_DATA.setValue(' ', new TileData("90White10Cave", TileType.Solid, 32, 224));
TILE_DATA.setValue('=', new TileData("Crop", TileType.Solid, 64, 32));
TILE_DATA.setValue('+', new TileData("Entry", TileType.Entry, 192, 160));
TILE_DATA.setValue('#', new TileData("Building", TileType.Solid, 192, 160));
TILE_DATA.setValue('!', new TileData("Sign", TileType.Ground, 160, 0));

var TILE_IMG = new Image();
TILE_IMG.src = "assets/resources/tiles.png";

var Tile = (function () {
    function Tile(target, tile, coords) {
        this._tile = tile;
        this._$el = $("<div></div>", { 'class': "tile type_" + tile._name });
        this._el = this._$el.get(0);
        this._coords = coords;

        $(target).append(this._el);
    }
    Tile.prototype.Draw = function (ctx) {
        ctx.drawImage(TILE_IMG, this._tile.xOffset, this._tile.yOffset, TILE_SIZE, TILE_SIZE, this._coords.X * TILE_SIZE, this._coords.Y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
        //this._el.style["-webkit-transform"] = "translate3d(" + this._coords.X * TILE_SIZE + 'px,' + this._coords.Y * TILE_SIZE + "px,0px) rotate(" + this._tile._turn + "deg)";
    };

    Tile.prototype.DetermineRotation = function (westTile, northTile) {
        var southWestTile;

        switch (this._tile._name) {
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
                this._tile._turn = 90;
            } else {
                // do nothing - no rotation required
            }
        } else if (northTile === southWestTile) {
            this._tile._turn = 180;
        } else {
            this._tile._turn = 270;
        }
    };
    return Tile;
})();
//# sourceMappingURL=tile.js.map
