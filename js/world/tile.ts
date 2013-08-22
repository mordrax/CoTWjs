/// <reference path="../zepto.d.ts"/>
/// <reference path="../globals.ts"/>

enum TileType {
    Ground,
    Water,
    Solid,
    Entry
}

var Coords : {x : number; y: number;};

class Building {
    map : string;
    name : string;
    size : string;
    entry_pos : Coords;
    start_pos : Coords;
    end_pos : Coords;

    constructor (map : string, name : string, size : string, entry_pos : Coords, start_pos : Coords, end_pos : Coords) {
        this.map = map;
        this.name = name;
        this.size = size;
        this.entry_pos = entry_pos;
        this.start_pos = start_pos;
        this.end_pos = end_pos;
    }
}

var BUILDINGDATA = {
    1: new Building("VillageMap", "Shop1", "3x3", (1, 2), (2, 3), (4, 5)),
    2: new Building("VillageMap", "Shop2", "3x3", (1, 2), (2, 3), (4, 5))
};

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
    1: new TileData("Rock",          TileType.Solid,    0),
    2: new TileData("Grass",         TileType.Ground,   0),
    3: new TileData("DarkDgn",       TileType.Ground,   0),
    4: new TileData("Water",         TileType.Water,    0),
    5: new TileData("Path",          TileType.Ground,   0),
    6: new TileData("LitDgn",        TileType.Ground,   0),
    11: new TileData("PathRock",      TileType.Solid,   0),
    12: new TileData("PathGrass",     TileType.Ground,  0),
    13: new TileData("WaterGrass",    TileType.Water,   0),
    14: new TileData("WaterPath",     TileType.Water,   0),
    15: new TileData("WallLitDgn",    TileType.Solid,   0),
    16: new TileData("WallDarkDgn",   TileType.Solid,   0),
    17: new TileData("50Grass50Cave", TileType.Solid,   0),
    18: new TileData("10Grass90Cave", TileType.Solid,   0),
    19: new TileData("50White50Cave", TileType.Solid,   0),
    20: new TileData("10White90Cave", TileType.Solid,   0),
    31: new TileData("Crop",          TileType.Ground, 0),
    32: new TileData("Entry",         TileType.Entry,  0),
    33: new TileData("Building",      TileType.Solid,   0),
    34: new TileData("Sign",          TileType.Ground,  0)
};

class Tile {
    _$el : ZeptoCollection;
    _el  : HTMLElement;
    _tile: TileData;

    constructor (target: string, tile : TileData) {
        this._tile = tile;
        this._$el = $("<div></div>", {class: "tile type_" + tile._name});
        this._el = this._$el.get(0);

        $(target).append(this._el);
    }

    updatePosition(_x : number, _y : number) {
        console.log (this._tile._turn)
        this._el.style["-webkit-transform"] = "translate3d(" + _x * TILE_SIZE + 'px,' + _y * TILE_SIZE + "px,0px) rotate(" + this._tile._turn + "deg)";
    }

}
