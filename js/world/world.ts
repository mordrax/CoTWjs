/// <reference path="../zepto.d.ts"/>
/// <reference path="tile.ts"/>
/// <reference path="structure.ts"/>
/// <reference path="../items/item.ts"/>
/// <reference path="../NPCs/npc.ts"/>

class World {
    _$el : ZeptoCollection;
    _el : HTMLElement;
    _tiles: Tile[][];
    _map : number[][];

    constructor (map: number[][])
    {
        this._map = map;
        this._tiles = new Array<Array<Tile>>();

        for (var x=0; x<this._map.length; x++) {
            this._tiles[x] = new Array <Tile>();
            for (var y=0; y<this._map[x].length; y++) {
                this._tiles[x][y] = new Tile("#background", TILEDATA[this._map[x][y]]);
            }
        }
    }

    determineRotation(x : number, y : number, map: number[][])  {

        var degrees : number;
        var southWestTile, north, west : string;

        // check if tile type requires possible rotation - exits with 0 if not one of the expected types
        switch (TILEDATA[map[x][y]]._name) {
            case "PathRock" : southWestTile = "Path" ; break;
            case "PathGrass" : southWestTile = "Path" ; break;
            case "WaterGrass" : southWestTile = "Water" ; break;
            case "WaterPath" : southWestTile = "Water" ; break;
            case "WallLitDgn" : southWestTile = "Wall" ; break;
            case "WallDarkDgn": southWestTile = "Wall" ; break;
            default : return 0;
        }

        if (y > 0) {
            north = TILEDATA[map[x][y-1]]._name;
        } // else south = undefined;

        if (x > 0) {
            west = TILEDATA[map[x-1][y]]._name;
        } // else west = undefined;

        if (north == southWestTile){
            if (west == southWestTile) {    // north and west
                degrees = 90;
            }
            else {                          // north and east
                degrees = 180;
            }
        }
        else if (west == southWestTile){    // south and west
            degrees = 0;
        }
        else {                              // south and east
            degrees = 270;
        }

        // return the number of degrees to rotate the tile
        return degrees;
    }

}