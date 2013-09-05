/// <reference path="../references.ts"/>

class World implements IDrawable {
    _$el:ZeptoCollection;
    _el:HTMLElement;
    _currentMap : string;
    _maps : collections.Dictionary<string, Tile[][]>;

    /**
     * World creation defaults to village _map
     * @param $el - Container element <background> for all tiles
     */
    constructor($el:ZeptoCollection) {

        this._$el = $el;
        this._el = $el.get(0);

        this._currentMap = MapType.VillageMap;
        this._maps = new collections.Dictionary<string, Tile[][]>();

        this.LoadMap(this._currentMap);
    }

    private LoadMap(mapType : string) : Tile[][] {
        this._$el.empty();

            var tile = new Array<Array<Tile>>();
            for (var y=0; y < MAPS[mapType].length; y++) {
                for (var x=0; x < MAPS[mapType][y].length; x++) {
                    if (y === 0) {
                        tile[x] = new Array<Tile>();
                    }
                    tile[x][y] = new Tile(TILE_DATA.getValue(MAPS[mapType][y][x]), new Point(x, y));
                }
            }
            this._maps.setValue(mapType, tile);

        return this._maps.getValue(mapType);
    }

    private CurrentTileSet():Array<Array<Tile>> {
        return this._maps.getValue(this._currentMap);
    }

    private CurrentStructureSet():Array<Structure>{
        return STRUCTURES[this._currentMap];
    }

    Draw(ctx : CanvasRenderingContext2D) {
        for (var x = 0; x < this.CurrentTileSet().length; x++) {
            for (var y = 0; y < this.CurrentTileSet()[0].length; y++) {
                if (x>0 && y>0){
                    // Pass in west and north. Note: north = [x][y-1], west = [x-1][y], south = [x][y+1], east = [x+1][y]
                    this.CurrentTileSet()[x][y].DetermineRotation(this.CurrentTileSet()[x-1][y]._tile._name, this.CurrentTileSet()[x][y-1]._tile._name)
                }
                this.CurrentTileSet()[x][y].Draw(ctx);
            }
        }

        this.CurrentStructureSet().forEach((x:Structure)=>{
            x.Draw(ctx);
        });

    }

    /**
     * Called when a player moves to a point in the world, check if that location is a link
     * If yes, then change the map and send the new location of the player (on the new map) back
     */
    MapLink(point : Point) : MapLink {
        var link : MapLink = null;

        MAP_TO_MAP.forEach((k:MapLink,v:MapLink) => {
            if ((this._currentMap === k.MapName) && point.Equals(k.Coord)) {
                link = v;
            }
            if ((this._currentMap === v.MapName) && point.Equals(v.Coord)) {
                link = k;
            }
        });

        // update the map
        if (link !== null) {
            this._currentMap = link.MapName;
            this.LoadMap(this._currentMap);
        }

        return link;
    }
}