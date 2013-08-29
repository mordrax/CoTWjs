/// <reference path="../globals.ts"/>
var TileType;
(function (TileType) {
    TileType[TileType["Ground"] = 0] = "Ground";
    TileType[TileType["Water"] = 1] = "Water";
    TileType[TileType["Solid"] = 2] = "Solid";
    TileType[TileType["Entry"] = 3] = "Entry";
})(TileType || (TileType = {}));

var TileData = (function () {
    function TileData(name, type) {
        this._name = name;
        this._type = type;
        this._turn = 0;
    }
    return TileData;
})();

var TILE_DATA;
TILE_DATA = new collections.Dictionary();

TILE_DATA.setValue('^', new TileData("Rock", TileType.Solid));
TILE_DATA.setValue(',', new TileData("Grass", TileType.Ground));
TILE_DATA.setValue(' ', new TileData("DarkDgn", TileType.Ground));
TILE_DATA.setValue(' ', new TileData("Water", TileType.Water));
TILE_DATA.setValue('.', new TileData("Path", TileType.Ground));
TILE_DATA.setValue(' ', new TileData("LitDgn", TileType.Ground));
TILE_DATA.setValue('_', new TileData("PathRock", TileType.Solid));
TILE_DATA.setValue(';', new TileData("PathGrass", TileType.Ground));
TILE_DATA.setValue(' ', new TileData("WaterGrass", TileType.Water));
TILE_DATA.setValue(' ', new TileData("WaterPath", TileType.Water));
TILE_DATA.setValue(' ', new TileData("WallLitDgn", TileType.Solid));
TILE_DATA.setValue(' ', new TileData("WallDarkDgn", TileType.Solid));
TILE_DATA.setValue(' ', new TileData("50Grass50Cave", TileType.Solid));
TILE_DATA.setValue(' ', new TileData("10Grass90Cave", TileType.Solid));
TILE_DATA.setValue(' ', new TileData("50White50Cave", TileType.Solid));
TILE_DATA.setValue(' ', new TileData("10White90Cave", TileType.Solid));
TILE_DATA.setValue('=', new TileData("Crop", TileType.Ground));
TILE_DATA.setValue('+', new TileData("Entry", TileType.Entry));
TILE_DATA.setValue('#', new TileData("Building", TileType.Solid));
TILE_DATA.setValue('!', new TileData("Sign", TileType.Ground));

var Tile = (function () {
    function Tile(target, tile, coords) {
        this._tile = tile;
        this._$el = $("<div></div>", { 'class': "tile type_" + tile._name });
        this._el = this._$el.get(0);
        this._coords = coords;

        $(target).append(this._el);
    }
    Tile.prototype.Draw = function () {
        this._el.style["-webkit-transform"] = "translate3d(" + this._coords.X * TILE_SIZE + 'px,' + this._coords.Y * TILE_SIZE + "px,0px) rotate(" + this._tile._turn + "deg)";
    };
    return Tile;
})();
//# sourceMappingURL=tile.js.map
