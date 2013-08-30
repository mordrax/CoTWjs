/// <reference path="../references.ts"/>
var World = (function () {
    /**
    * World creation defaults to village _map
    * @param $el - Container element <background> for all tiles
    */
    function World($el) {
        this._$el = $el;
        this._el = $el.get(0);

        this._currentMap = MapType.VillageMap;
        this._maps = new collections.Dictionary();

        this.LoadMap(this._currentMap);
    }
    World.prototype.LoadMap = function (mapType) {
        this._$el.empty();

        var tile = new Array();
        for (var y = 0; y < MAPS[mapType].length; y++) {
            for (var x = 0; x < MAPS[mapType][y].length; x++) {
                if (y === 0) {
                    tile[x] = new Array();
                }
                tile[x][y] = new Tile("#background", TILE_DATA.getValue(MAPS[mapType][y][x]), new Point(x, y));
                //tile[x][y]._tile._turn = this.determineRotation(x,y, this.CurrentTileSet());
            }
        }
        this._maps.setValue(mapType, tile);

        return this._maps.getValue(mapType);
    };

    World.prototype.CurrentTileSet = function () {
        return this._maps.getValue(this._currentMap);
    };

    World.prototype.Draw = function () {
        for (var x = 0; x < this.CurrentTileSet().length; x++) {
            for (var y = 0; y < this.CurrentTileSet()[0].length; y++) {
                this.CurrentTileSet()[x][y].Draw();
            }
        }
    };

    /**
    * Called when a player moves to a point in the world, check if that location is a link
    * If yes, then change the map and send the new location of the player (on the new map) back
    */
    World.prototype.MapLink = function (point) {
        var _this = this;
        var link = null;

        MAP_TO_MAP.forEach(function (k, v) {
            if ((_this._currentMap === k.MapName) && point.Equals(k.Coord)) {
                link = v;
            }
            if ((_this._currentMap === v.MapName) && point.Equals(v.Coord)) {
                link = k;
            }
        });

        if (link !== null) {
            this._currentMap = link.MapName;
            this.LoadMap(this._currentMap);
        }

        return link;
    };

    World.prototype.determineRotation = function (x, y, map) {
        var degrees;
        var southWestTile, north, west;

        switch (TILE_DATA[map[x][y]]._name) {
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
                return 0;
        }

        if (y > 0) {
            north = TILE_DATA[map[x][y - 1]]._name;
        }

        if (x > 0) {
            west = TILE_DATA[map[x - 1][y]]._name;
        }

        if (north == southWestTile) {
            if (west == southWestTile) {
                degrees = 90;
            } else {
                degrees = 180;
            }
        } else if (west == southWestTile) {
            degrees = 0;
        } else {
            degrees = 270;
        }

        // return the number of degrees to rotate the tile
        return degrees;
    };
    return World;
})();
//# sourceMappingURL=world.js.map
