/// <reference path="../references.ts"/>

class World implements IDrawable {
    _$el:ZeptoCollection;
    _el:HTMLElement;
    _tiles:Tile[][];
    _mapType : string;

    /**
     * World creation defaults to village _map
     * @param $el - Container element <background> for all tiles
     */
        constructor($el:ZeptoCollection) {

        this._$el = $el;
        this._el = $el.get(0);

        this._mapType = MapType.VillageMap;

        this._tiles = new Array<Array<Tile>>();

        this.LoadMap();
    }

    private LoadMap() {
        this._$el.empty();
        for (var x = 0; x < this.Map().length; x++) {
            this._tiles[x] = new Array <Tile>();
            for (var y = 0; y < this.Map()[x].length; y++) {
                this._tiles[x][y] = new Tile("#background", TILE_DATA[this.Map()[x][y]], new Point(x, y));
                this._tiles[x][y]._tile._turn = this.determineRotation(x, y, this.Map());
            }
        }
    }

    private Map():number[][] {
        return MAPS[this._mapType];
    }

    Draw() {
        for (var x = 0; x < this._tiles.length; x++) {
            for (var y = 0; y < this._tiles.length; y++) {
                this._tiles[x][y].Draw();
            }
        }
    }

    /**
     * Called when a player moves to a point in the world, check if that location is a link
     * If yes, then change the map and send the new location of the player (on the new map) back
     */
    MapLink(point : Point) : MapLink {
        var link : MapLink = null;

        MAP_TO_MAP.forEach((k:MapLink,v:MapLink) => {
            if ((this._mapType === k.MapName) && point.Equals(k.Coord)) {
                link = v;
            }
            if ((this._mapType === v.MapName) && point.Equals(v.Coord)) {
                link = k;
            }
        });

        // update the map
        if (link !== null) {
            this._mapType = link.MapName;
            this.LoadMap();
        }

        return link;
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