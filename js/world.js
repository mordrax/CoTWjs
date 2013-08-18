var World = (function () {
    function World(map) {
        this._map = map;
        this._tiles = new Array();

        for (var x = 0; x < this._map.length; x++) {
            this._tiles[x] = new Array();
            for (var y = 0; y < this._map[x].length; y++) {
                this._tiles[x][y] = new Tile("#background", TILEDATA[this._map[x][y]]);
                this._tiles[x][y]._tile._turn = this.determineRotation(x, y, this._map);
            }
        }
    }
    World.prototype.determineRotation = function (x, y, map) {
        var degrees;
        var southWestTile, north, west;

        if (y > 0) {
            north = TILEDATA[map[x][y - 1]]._name;
        }

        if (x > 0) {
            west = TILEDATA[map[x - 1][y]]._name;
        }

        console.log(TILEDATA[map[x][y]]._name);

        switch (TILEDATA[map[x][y]]._name) {
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

        if (north == southWestTile) {
            if (west == southWestTile) {
                degrees = 270;
            } else {
                degrees = 180;
            }
        } else if (west == southWestTile) {
            degrees = 0;
        } else {
            degrees = 90;
        }

        console.log(southWestTile);
        console.log(north);
        console.log(west);
        console.log(degrees);

        return degrees;
    };
    return World;
})();
