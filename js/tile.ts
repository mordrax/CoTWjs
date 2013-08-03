/**
 * Created by mordrax on 18/07/13.
 */

/// <reference path="zepto.d.ts"/>

enum TileType {
    Ground,
    Water,
    Solid,
    Entry
}

class TileData{
    _name : string;
    _type : TileType;
    _turn : number;

    constructor (name : string, type : TileType, turn : number) {
        this._name = name;
        this._type = type;
        this._turn = turn;
    }
}

var TILEDATA = {
    1:  new TileData("Rock",          TileType.Solid,     0    ),
    2:  new TileData("RockPath",      TileType.Solid,     0    ),
    3:  new TileData("RockPath",      TileType.Solid,     90   ),
    4:  new TileData("RockPath",      TileType.Solid,     180  ),
    5:  new TileData("RockPath",      TileType.Solid,     270  ),
    6:  new TileData("Grass",         TileType.Ground,    0    ),
    7:  new TileData("GrassPath",     TileType.Ground,    0    ),
    8:  new TileData("GrassPath",     TileType.Ground,    90   ),
    9:  new TileData("GrassPath",     TileType.Ground,    180  ),
    10: new TileData("GrassPath",     TileType.Ground,    270  ),
    11: new TileData("DarkDgn",       TileType.Ground,    0    ),
    12: new TileData("DarkDgnWall",   TileType.Solid,     0    ),
    13: new TileData("DarkDgnWall",   TileType.Solid,     90   ),
    14: new TileData("DarkDgnWall",   TileType.Solid,     180  ),
    15: new TileData("DarkDgnWall",   TileType.Solid,     270  ),
    16: new TileData("Water",         TileType.Water,     0    ),
    17: new TileData("WaterGrass",    TileType.Water,     0    ),
    18: new TileData("WaterGrass",    TileType.Water,     90   ),
    19: new TileData("WaterGrass",    TileType.Water,     180  ),
    20: new TileData("WaterGrass",    TileType.Water,     270  ),
    21: new TileData("Path",          TileType.Ground,    0    ),
    22: new TileData("WaterPath",     TileType.Water,     0    ),
    23: new TileData("WaterPath",     TileType.Water,     90   ),
    24: new TileData("WaterPath",     TileType.Water,     180  ),
    25: new TileData("WaterPath",     TileType.Water,     270  ),
    26: new TileData("LitDgn",        TileType.Ground,    0    ),
    27: new TileData("LitDgnWall",    TileType.Solid,     0    ),
    28: new TileData("LitDgnWall",    TileType.Solid,     90   ),
    29: new TileData("LitDgnWall",    TileType.Solid,     180  ),
    30: new TileData("LitDgnWall",    TileType.Solid,     270  ),
    31: new TileData("Crop",          TileType.Ground,    0    ),
    32: new TileData("Entry",         TileType.Entry,     0    ),
    33: new TileData("Building",      TileType.Solid,     0    ),
    34: new TileData("Sign",          TileType.Ground,    0    )
};

class Tile {
    _$el : ZeptoCollection;
    _el  : HTMLElement;
    _tile;

    constructor (target: string, tile : TileData, model) {
        this._tile = tile;
        this._$el = $("<div></div>", {class: "tile type_" + tile._name});
        this._el = this._$el.get(0);

        $(target).append(this._$el.toString());
    }

    updatePosition(_x : number, _y : number) {
        this._el.style["-webkit-transform"] = "translate3d(" + _x * TILE_SIZE + 'px,' + _y * TILE_SIZE + "px,0px) rotate(" + this._tile.turn + "deg)";
    }

}
