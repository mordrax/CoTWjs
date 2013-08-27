/// <reference path="../references.ts"/>
var MapType = (function () {
    function MapType() {
    }
    MapType.VillageMap = 'Village';
    MapType.FarmMap = 'Farm';
    return MapType;
})();

var GameMap = (function () {
    function GameMap() {
    }
    return GameMap;
})();
var MAPS;

MAPS = {};

MAPS[MapType.VillageMap] = [
    [31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31],
    [31, 31, 31, 31, 31, 2, 33, 33, 33, 2, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31],
    [31, 31, 31, 31, 31, 2, 33, 33, 33, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 31, 31, 31, 31, 31, 31],
    [31, 31, 31, 31, 31, 2, 33, 32, 33, 31, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 31, 31, 31, 31, 31, 31],
    [31, 31, 31, 31, 31, 2, 2, 5, 2, 2, 2, 2, 2, 2, 2, 2, 2, 33, 33, 33, 2, 2, 2, 2, 2, 2, 2, 2],
    [31, 31, 31, 31, 31, 2, 12, 5, 2, 2, 2, 2, 2, 33, 33, 2, 2, 33, 33, 33, 2, 2, 2, 2, 2, 2, 2, 2],
    [2, 2, 2, 2, 2, 12, 5, 12, 2, 2, 2, 2, 2, 32, 33, 2, 2, 33, 32, 33, 2, 2, 2, 2, 2, 2, 2, 2],
    [2, 2, 2, 2, 2, 5, 12, 2, 2, 2, 2, 2, 2, 5, 34, 2, 2, 34, 5, 2, 2, 2, 33, 33, 33, 33, 33, 2],
    [33, 2, 2, 2, 2, 5, 2, 2, 2, 2, 2, 2, 2, 5, 2, 2, 2, 5, 5, 5, 2, 2, 33, 33, 33, 33, 33, 2],
    [32, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 32, 5, 5, 5, 32, 33, 33, 33, 33, 2],
    [33, 2, 2, 2, 2, 2, 2, 2, 5, 2, 2, 2, 2, 5, 2, 2, 2, 5, 5, 5, 2, 34, 33, 33, 33, 33, 33, 2],
    [2, 2, 2, 2, 2, 2, 2, 12, 5, 2, 2, 2, 2, 5, 2, 2, 2, 34, 5, 2, 2, 2, 33, 33, 33, 33, 33, 2],
    [2, 2, 2, 2, 2, 2, 12, 5, 12, 2, 2, 2, 33, 32, 33, 2, 2, 33, 32, 33, 2, 2, 2, 2, 2, 2, 2, 2],
    [2, 2, 2, 2, 2, 2, 5, 12, 2, 2, 2, 2, 33, 33, 33, 2, 2, 33, 33, 33, 2, 2, 2, 2, 2, 2, 2, 2],
    [31, 31, 31, 31, 31, 33, 32, 33, 2, 2, 2, 2, 33, 33, 33, 2, 2, 33, 33, 33, 2, 2, 2, 2, 2, 2, 2, 2],
    [31, 31, 31, 31, 31, 33, 33, 33, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 31, 31, 31, 31, 31, 31],
    [31, 31, 31, 31, 31, 33, 33, 33, 2, 2, 2, 2, 2, 2, 2, 2, 2, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31],
    [31, 31, 31, 31, 31, 31, 31, 31, 2, 2, 2, 2, 2, 2, 2, 2, 2, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31],
    [31, 31, 31, 31, 31, 31, 31, 31, 2, 2, 2, 2, 2, 2, 2, 2, 2, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31],
    [31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31],
    [31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31],
    [31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31],
    [31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31],
    [31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31]
];
MAPS[MapType.FarmMap] = [
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 5, 22, 23, 24, 25, 3, 3],
    [26, 27, 28, 29, 30, 31, 3, 3, 3, 3, 3, 3, 3, 5, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
    [5, 5, 6, 6, 6, 3, 6, 6, 6, 6, 6, 6, 6, 5, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6],
    [5, 5, 6, 6, 3, 6, 6, 6, 6, 6, 6, 6, 6, 5, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6],
    [5, 5, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 5, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6],
    [5, 5, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 5, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6],
    [5, 5, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 5, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6],
    [5, 5, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 5, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6],
    [5, 5, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 5, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6],
    [5, 5, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 5, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6],
    [5, 5, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 5, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6],
    [5, 5, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 5, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6],
    [5, 5, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 5, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6],
    [5, 5, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 5, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6],
    [5, 5, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 5, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6],
    [5, 5, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 5, 6, 6, 6, 6, 31, 31, 6, 6, 6, 6, 6, 6, 6],
    [5, 5, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 5, 6, 6, 6, 6, 31, 31, 6, 6, 6, 6, 6, 6, 6],
    [5, 5, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 31, 31, 6, 6, 6, 6, 6, 6, 6]
];
//# sourceMappingURL=GameMap.js.map
