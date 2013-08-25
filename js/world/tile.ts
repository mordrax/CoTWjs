/// <reference path="../globals.ts"/>

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

    constructor (name : string, type : TileType) {
        this._name = name;
        this._type = type;
        this._turn = 0;
    }
}
var TILE_DATA = {
    1: new TileData("Rock",          TileType.Solid   ),
    2: new TileData("Grass",         TileType.Ground  ),
    3: new TileData("DarkDgn",       TileType.Ground  ),
    4: new TileData("Water",         TileType.Water   ),
    5: new TileData("Path",          TileType.Ground  ),
    6: new TileData("LitDgn",        TileType.Ground  ),
    11: new TileData("PathRock",      TileType.Solid  ),
    12: new TileData("PathGrass",     TileType.Ground ),
    13: new TileData("WaterGrass",    TileType.Water  ),
    14: new TileData("WaterPath",     TileType.Water  ),
    15: new TileData("WallLitDgn",    TileType.Solid  ),
    16: new TileData("WallDarkDgn",   TileType.Solid  ),
    17: new TileData("50Grass50Cave", TileType.Solid  ),
    18: new TileData("10Grass90Cave", TileType.Solid  ),
    19: new TileData("50White50Cave", TileType.Solid  ),
    20: new TileData("10White90Cave", TileType.Solid  ),
    31: new TileData("Crop",          TileType.Ground ),
    32: new TileData("Entry",         TileType.Entry  ),
    33: new TileData("Building",      TileType.Solid  ),
    34: new TileData("Sign",          TileType.Ground )
};

class Tile implements IDrawable {
    _$el : ZeptoCollection;
    _el  : HTMLElement;
    _tile: TileData;
    _coords : Point;

    constructor (target: string, tile : TileData, coords: Point) {
        this._tile = tile;
        this._$el = $("<div></div>", {'class': "tile type_" + tile._name});
        this._el = this._$el.get(0);
        this._coords = coords;

        $(target).append(this._el);
    }

    Draw() {
        this._el.style["-webkit-transform"] = "translate3d(" + this._coords.X * TILE_SIZE + 'px,' + this._coords.Y * TILE_SIZE + "px,0px) rotate(" + this._tile._turn + "deg)";
    }

}
