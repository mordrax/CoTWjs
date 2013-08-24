var World = (function () {
    function World($el) {
        this._$el = $el;
        this._el = $el.get(0);

        this._map = MAPS.villageMap;
        this._tiles = new Array();

        for (var x = 0; x < this._map.length; x++) {
            this._tiles[x] = new Array();
            for (var y = 0; y < this._map[x].length; y++) {
                this._tiles[x][y] = new Tile("#background", TILE_DATA[this._map[x][y]], new Point(x, y));
            }
        }
    }
    World.prototype.Draw = function () {
        for (var x = 0; x < this._tiles.length; x++) {
            for (var y = 0; y < this._tiles.length; y++) {
                this._tiles[x][y]._tile._turn = this.determineRotation(x, y, this._map);
                this._tiles[x][y].Draw();
            }
        }
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

        return degrees;
    };
    return World;
})();
//@ sourceMappingURL=world.js.map
