var World = (function () {
    function World(map) {
        this._map = map;

        for (var x = 0; x < this._map.length; x++) {
            this._tiles[x] = [];
            for (var y = 0; y < this._map[x].length; y++) {
                this._tiles[x][y] = new Tile("#background", TILEDATA[this._map[x][y]], world);
            }
        }
    }
    return World;
})();
