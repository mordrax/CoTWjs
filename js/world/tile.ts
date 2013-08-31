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



var TILE_DATA : collections.Dictionary<string, TileData>;
TILE_DATA = new collections.Dictionary<string, TileData>();

TILE_DATA.setValue('^', new TileData("Rock",            TileType.Solid  ));
TILE_DATA.setValue(',', new TileData("Grass",           TileType.Ground ));
TILE_DATA.setValue(' ', new TileData("DarkDgn",         TileType.Ground ));
TILE_DATA.setValue(' ', new TileData("Water",           TileType.Water  ));
TILE_DATA.setValue('.', new TileData("Path",            TileType.Ground ));
TILE_DATA.setValue(' ', new TileData("LitDgn",          TileType.Ground ));
TILE_DATA.setValue('_', new TileData("PathRock",        TileType.Solid  ));
TILE_DATA.setValue(';', new TileData("PathGrass",       TileType.Ground ));
TILE_DATA.setValue(' ', new TileData("WaterGrass",      TileType.Water  ));
TILE_DATA.setValue(' ', new TileData("WaterPath",       TileType.Water  ));
TILE_DATA.setValue(' ', new TileData("WallLitDgn",      TileType.Solid  ));
TILE_DATA.setValue(' ', new TileData("WallDarkDgn",     TileType.Solid  ));
TILE_DATA.setValue(' ', new TileData("50Grass50Cave",   TileType.Solid  ));
TILE_DATA.setValue(' ', new TileData("10Grass90Cave",   TileType.Solid  ));
TILE_DATA.setValue(' ', new TileData("50White50Cave",   TileType.Solid  ));
TILE_DATA.setValue(' ', new TileData("10White90Cave",   TileType.Solid  ));
TILE_DATA.setValue('=', new TileData("Crop",            TileType.Ground ));
TILE_DATA.setValue('+', new TileData("Entry",           TileType.Entry  ));
TILE_DATA.setValue('#', new TileData("Building",        TileType.Solid  ));
TILE_DATA.setValue('!', new TileData("Sign",            TileType.Ground ));

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

    DetermineRotation(northTile:string, westTile:string) {

        var degrees:number;
        var southWestTile:string;

        // check if tile type requires possible rotation - exits with 0 if not one of the expected types
        switch (this._tile._name) {
            case "PathRock" :
                southWestTile = "Path";
                break;
            case "PathGrass" :
                southWestTile = "Path";
                break;
            case "WaterGrass" :
                southWestTile = "Water";
                break;
            case "WaterPath" :
                southWestTile = "Water";
                break;
            case "WallLitDgn" :
                southWestTile = "Wall";
                break;
            case "WallDarkDgn":
                southWestTile = "Wall";
                break;
            default :
                this._tile._turn = 0;
        }

        if (northTile == southWestTile) {
            if (westTile == southWestTile) {    // north and west
                this._tile._turn = 90;
            }
            else {                          // north and east
                this._tile._turn = 180;
            }
        }
        else if (westTile == southWestTile) {    // south and west
            this._tile._turn = 270;
        }
        else {                              // south and east
            this._tile._turn = 270;
        }
    }

}
