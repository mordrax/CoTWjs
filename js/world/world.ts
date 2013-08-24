/// <reference path="../references.ts"/>

class World implements IDrawable {
    _$el:ZeptoCollection;
    _el:HTMLElement;
    _tiles:Tile[][];
    _map:number[][];

    constructor($el:ZeptoCollection) {

        this._$el = $el;
        this._el = $el.get(0);

        this._map = MAPS.villageMap;
        this._tiles = new Array<Array<Tile>>();

        for (var x = 0; x < this._map.length; x++) {
            this._tiles[x] = new Array <Tile>();
            for (var y = 0; y < this._map[x].length; y++) {
                this._tiles[x][y] = new Tile("#background", TILE_DATA[this._map[x][y]], new Point(x,y));
            }
        }
    }

    Draw() {
        for (var x=0; x<this._tiles.length; x++) {
            for (var y=0; y<this._tiles.length; y++) {
                this._tiles[x][y]._tile._turn = this.determineRotation(x, y, this._map);
                this._tiles[x][y].Draw();
            }
        }
    }

    private determineRotation(x:number, y:number, map:number[][]) {

        var degrees:number;
        var southWestTile, north, west:string;

        // check if tile type requires possible rotation - exits with 0 if not one of the expected types
        switch (TILE_DATA[map[x][y]]._name) {
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
                return 0;
        }

        if (y > 0) {
            north = TILE_DATA[map[x][y - 1]]._name;
        } // else south = undefined;

        if (x > 0) {
            west = TILE_DATA[map[x - 1][y]]._name;
        } // else west = undefined;

        if (north == southWestTile) {
            if (west == southWestTile) {    // north and west
                degrees = 90;
            }
            else {                          // north and east
                degrees = 180;
            }
        }
        else if (west == southWestTile) {    // south and west
            degrees = 0;
        }
        else {                              // south and east
            degrees = 270;
        }

        // return the number of degrees to rotate the tile
        return degrees;
    }

}