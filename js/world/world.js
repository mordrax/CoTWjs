/// <reference path="../references.ts"/>
var World = (function () {
    /**
    * World creation defaults to village _map
    * @param $el - Container element <background> for all tiles
    */
    function World($el) {
        this._$el = $el;
        this._el = $el.get(0);

        this._mapType = MapType.VillageMap;

        this._tiles = new Array();

        this.LoadMap();
    }
    World.prototype.LoadMap = function () {
        this._$el.empty();
        for (var x = 0; x < this.Map().length; x++) {
            this._tiles[x] = new Array();
            for (var y = 0; y < this.Map()[x].length; y++) {
                this._tiles[x][y] = new Tile("#background", TILE_DATA[this.Map()[x][y]], new Point(x, y));
                this._tiles[x][y]._tile._turn = this.determineRotation(x, y, this.Map());
            }
        }
    };

    World.prototype.Map = function () {
        return MAPS[this._mapType];
    };

    World.prototype.Draw = function () {
        for (var x = 0; x < this._tiles.length; x++) {
            for (var y = 0; y < this._tiles.length; y++) {
                this._tiles[x][y].Draw();
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
            if ((_this._mapType === k.MapName) && point.Equals(k.Coord)) {
                link = v;
            }
            if ((_this._mapType === v.MapName) && point.Equals(v.Coord)) {
                link = k;
            }
        });

        if (link !== null) {
            this._mapType = link.MapName;
            this.LoadMap();
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
