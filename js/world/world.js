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
            }
        }
        this._maps.setValue(mapType, tile);

        return this._maps.getValue(mapType);
    };

    World.prototype.CurrentTileSet = function () {
        return this._maps.getValue(this._currentMap);
    };

    World.prototype.CurrentStructureSet = function () {
        return STRUCTURES.getValue(this._currentMap);
    };

    World.prototype.Draw = function (ctx) {
        for (var x = 0; x < this.CurrentTileSet().length; x++) {
            for (var y = 0; y < this.CurrentTileSet()[0].length; y++) {
                if (x > 0 && y > 0) {
                    // Pass in west and north. Note: north = [x][y-1], west = [x-1][y], south = [x][y+1], east = [x+1][y]
                    this.CurrentTileSet()[x][y].DetermineRotation(this.CurrentTileSet()[x - 1][y]._tile._name, this.CurrentTileSet()[x][y - 1]._tile._name);
                }
                this.CurrentTileSet()[x][y].Draw(ctx);
            }
        }
        /*
        for (var x = 0; x < this.CurrentStructureSet().length; x++) {
        this.CurrentStructureSet()[x].Draw();
        }
        */
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
    return World;
})();
//# sourceMappingURL=world.js.map
