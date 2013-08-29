/// <reference path="../references.ts"/>
var MapType = (function () {
    function MapType() {
    }
    MapType.VillageMap = 'Village';
    MapType.FarmMap = 'Farm';
    return MapType;
})();

/**
* Links MapTypes via points
*/
var MapLink = (function () {
    function MapLink(map, point) {
        this.MapName = map;
        this.Coord = point;
    }
    return MapLink;
})();

/**
* Dictionary of MapType to ,D array of tiles
*/
var MAPS;
MAPS = new collections.Dictionary();

var MAP_TO_MAP;
MAP_TO_MAP = new collections.Dictionary();

MAP_TO_MAP.setValue(new MapLink(MapType.VillageMap, new Point(9, 0)), new MapLink(MapType.FarmMap, new Point(5, 5)));

MAPS[MapType.VillageMap] = [
    '========,,#+#,,,========',
    '========,,,.,,,,========',
    '========,,,.,,,,========',
    '========,,,.,,,,========',
    '========,,,.,,,,========',
    '===,,,,,;...,,,,###=====',
    '===###,;.;,.,,;.+##=====',
    '===##+..;,,.,;.;###=====',
    '===###,,,,,...;,,,,,,===',
    '===,,=,,,,,.,,,,,,,,,===',
    '====,,,,,,,.,,,,,,,,,===',
    '====,,,,,,,.,,,,,,,,,===',
    '====,,,,,,,.,,###,,,,===',
    '====,,,#+.....+##,,,,===',
    '====,,,##!,.,,###,,,,===',
    '====,,,,,,,.,,,,,,,,,===',
    '====,,,,,,,.,,,,,,,,,===',
    '====,,###!...!###,======',
    '====,,##+..#..+##,======',
    '====,,###,...,###,======',
    '====,,,,,,,.,,,,,,======',
    '====,,,,,,,.!,,,,,======',
    '======,,,##+##,,,=======',
    '======,,,#####,,,=======',
    '======,,,#####,,,=======',
    '======,,,#####,,,=======',
    '======,,,#####,,,=======',
    '======,,,,,,,,,,,======='
];
//# sourceMappingURL=GameMap.js.map
