/// <reference path="../references.ts"/>
var MapType;
(function (MapType) {
    MapType[MapType["VillageMap"] = 0] = "VillageMap";
    MapType[MapType["FarmMap"] = 1] = "FarmMap";
    MapType[MapType["MinesLv1"] = 2] = "MinesLv1";
})(MapType || (MapType = {}));

/**
* Dictionary of MapType to ,D array of tiles
*/
var ASCII_MAPS;
ASCII_MAPS = new collections.Dictionary();

var AREA_STRUCTURES;
AREA_STRUCTURES = {};

var MAP_TO_MAP;
MAP_TO_MAP = new collections.Dictionary();

MAP_TO_MAP.setValue(new WorldCoordinates(MapType.VillageMap, new Point(11, 0)), new WorldCoordinates(MapType.FarmMap, new Point(11, 32)));
MAP_TO_MAP.setValue(new WorldCoordinates(MapType.FarmMap, new Point(24, 1)), new WorldCoordinates(MapType.MinesLv1, new Point(22, 39)));

ASCII_MAPS[MapType.VillageMap] = [
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
    '======,,,##+##,=========',
    '======,,,#####,=========',
    '======,,,#####,=========',
    '======,,,#####,=========',
    '======,,,#####,=========',
    '========================'
];

AREA_STRUCTURES[MapType.VillageMap] = [
    { id: "Village_Gate", type: StructureType.Gate_NS, location: new WorldCoordinates(MapType.VillageMap, new Point(10, 0)) },
    { id: "Farm1", type: StructureType.StrawHouse_EF, location: new WorldCoordinates(MapType.VillageMap, new Point(3, 6)) },
    { id: "Farm2", type: StructureType.StrawHouse_WF, location: new WorldCoordinates(MapType.VillageMap, new Point(16, 5)) },
    { id: "Snorri the Sage", type: StructureType.Hut_EF, location: new WorldCoordinates(MapType.VillageMap, new Point(7, 13)) },
    { id: "Olaf's Junk Store", type: StructureType.StrawHouse_WF, location: new WorldCoordinates(MapType.VillageMap, new Point(14, 12)) },
    { id: "Bjorn the Blacksmith", type: StructureType.StrawHouse_EF, location: new WorldCoordinates(MapType.VillageMap, new Point(6, 17)), goodsType: [ItemType.Weapon, ItemType.Armour, ItemType.Shield, ItemType.Helmet, ItemType.Bracer, ItemType.Gauntlet], goodsQuality: 1 },
    { id: "Gunnhild's General Store", type: StructureType.StrawHouse_WF, location: new WorldCoordinates(MapType.VillageMap, new Point(14, 17)) },
    { id: "Shrine of Odin", type: StructureType.HutTemple_NF, location: new WorldCoordinates(MapType.VillageMap, new Point(9, 22)) }
];

ASCII_MAPS[MapType.FarmMap] = [
    '^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^',
    '^^^^^^^^^^^^^^^^^^^^^^^^+^^^^^^^^^^^^^^^^^^^^^^^^',
    '^^^^^^^^^^^^^^^^^^^^^^^^.^^^^^^^^^^^^^^^^^^^^^^^^',
    '^^^^^^^^^^^^^^^^^^^^^^^^.,,,^^^^^^^^^^^^^^^^^^^^^',
    '^^^^^^^^^^^^^^^^^^^^^^,,.,,,,,^^^^^^^^^^^^^^^^^^^',
    '^^^^^^^^^^^^^^^^^,,,,,,,.,,,,,,^^^^^^^^^^^^^^^^^^',
    '^^^^^^^^^^^^^^^^,,,,,,,,.,,,,,,,,,^^^^^^^^^^^^^^^',
    ',,,,,,,,,,,,,,,,,,,,,,,,.,,,,,,,,,,,,,,,,,,,,,,,,',
    ',,,,,,,,,,,,,,,,,,,,,,,,.,,,,,,,,,,,,,,,,,,,,,,,,',
    ',,,,,,,,,,,,,,,,,,,,,,,,.,,,,,,,,,,,,,,,,,,,,,,,,',
    ',,,,,,,,,,,,,,,,,,,,,,,,.,,,,,,,,,,,,,,,,,,,,,,,,',
    ',,,,,,,,,,,,,,,,,,,,,,,,.,,,,,,,,,,,,,,,,,,,,,,,,',
    ',,,,,,,,,,,,,,,,,,,,,,,,.,,,,,,,,,,,,,,,,,,,,,,,,',
    ',,,,,,,,,,,,,,,,,,,,,,,,.,,,,,,,,,,,,,,,,,,,,,,,,',
    ',,,,,,,,,,,,,,,,,,,,,,,,.,,,,,,,,,,,,,,,,,,,,,,,,',
    '.................................................',
    '.................................................',
    ',,,,,,,,,,,,,,,,,,,,,,,..;,,,,,,,,,,,,,,,,,,,,,,,',
    ',,,,,,,,,,,,,,,,,,,,,,;.;,,,,,,,,,,,,,,,,,,,,,,,,',
    ',,,,,,,,,,,,,,,,,,,,,;.;,,,,,,,,,,,,,,,,,,,,,,,,=',
    ',,,,,,,,,,,,,,,,,,,,;.;,,,,,,,,,,,,,,,,,,,,,,,,,=',
    ',,,,,,,,,,,,,,,,,,,;.;,,,,,,,,,,,,,,,,,,,,,,,,,,=',
    ',,,,,,,,,,,,,,,,,,;.;,,,,,,,,,,,,,,,,,,,,,,,,,,,=',
    ',,,,,,,,,,,,,,,,,;.;,,,,,,,,,,,,,,,,,,,,,,,###,,=',
    ',,,,,,,,,,,,,,,,;..........................+##,,=',
    ',,,,,,,,,,,,,,,;.;,,,,,,,,,,,,,,,,,,,,,,,,,###,,=',
    ',,,,,,,,,,,,,,;.;,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,=',
    ',,,,,,,,,,,,,;.;,,,,,,,,,,,,,,,,,,,,,,,,,,=======',
    ',,,,,,,,,,,,;.;,,,,,,,,,,,,,,,,,,,,,,,,,,,=======',
    '========,,,;.;,,,,,,,,,,,,,,,,,,,,,,,,,,,,=======',
    '========,,,.;,,,,,,,,,,,,,,,,,,,,,,,,,,,,,=======',
    '========,,,.,,,,,=======,,,,,,,,,,,,,,,,,,=======',
    '========,,#+#,,,,=======,,,,,,,,,,,,,,,,,,,,,,,,,'
];

AREA_STRUCTURES[MapType.FarmMap] = [
    { id: "Village_Gate", type: StructureType.Gate_NS, location: new WorldCoordinates(MapType.FarmMap, new Point(10, 32)) },
    { id: "HeroBurntFarm", type: StructureType.BurntStrawHouse_WF, location: new WorldCoordinates(MapType.FarmMap, new Point(43, 23)) },
    { id: "Mine Entrance", type: StructureType.MineEntrance, location: new WorldCoordinates(MapType.FarmMap, new Point(24, 1)) }
];

ASCII_MAPS[MapType.MinesLv1] = [
    '^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^',
    '^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^',
    '^^^^^^^^^^^^^^^^^^coooo^^ooc^^^^^^^^^^^^^',
    '^^^^^^^^^^^^^^^^^^oooooccooo^^^^^^^^^^^^',
    '^^^^^^^^^^^^^^^^coccoooooooo^^^^^^^^^^^^',
    '^^^^^^^^^^^^^^^coc^^oooo^ooo^^^^^^^^^^^^',
    '^^^^^^^^^^^^^^^oc^^^cooo^ooo^^^^^^^^^^^^',
    '^^^^^^^^^^^^^^^o^^^^^coc^coc^^^^^^^^^^^^',
    '^^^^^^^^^^^^^^^oc^^^^^^^^^^^^^^^^^^^^^^^',
    '^^^^^^^^^^^^^^^coc^^^^^^^^^^^^^^^^^^^^^^',
    '^^^^^^^^^^^^^^^^coc^^^^^^^^^^^^^^^^^^^^^',
    '^^^^^^^^^^^^^^^^^co^^^^^^^^^^^^^^^^^^^^^',
    '^^^^^^^^^^^^^^^^^^o^^^^^^^^^^^^^^^^^^^^^',
    '^^^^^^^^^^^^^^^^^^oc^^^^^^^^^^^^^^^^^^^^',
    '^^^^^^^^^^^^^^^^^^coc^^^^^^^^^^^^^^^^^^^',
    '^^^^^^^^^^^^^^^^^^^coc^^^^^^^^^^^^^^^^^^',
    '^^^^^^^^^^^^^^^^^^^^coc^^^^^^^^^^^^^^^^^',
    '^^^^^^^^^^^^^^^^^^^^^co^^^^^^^^^^^^^^^^^',
    '^^^^^^^^^^^^coooc^^^^^o^^^^^^^^^^^^^^^^^',
    '^^^^^^^^^^^^oooooc^^^^o^^^^^^^^^^coooc^^',
    '^^^^^^^^^^^^ooooooo^^^o^^^^^^^^^^ooooo^^^',
    '^^^^^^^^^^^^coooooo^^^o^^^^^^^^^^ooooo^^',
    '^^^^^^^^^^^^^o^^^^^^^^o^^^^^^^^^cooooo^^',
    '^^^^^^^^^^^^^o^^^^^^^^o^^^^^cooooooooo^^',
    '^^^^^^^^^^^^^o^^^^^^^^o^^^^coc^^^coooo^^',
    '^^^^^^^^^^^^^oc^^^^^^^oc^^coc^^^^^^ooo^^',
    '^^^^^^^^^^^^^coc^^^^^^coccoc^^^^^^oooc^^',
    '^^^^^^^^^^^^^^coc^^^^^^cooc^^^^^^^^^^^^^',
    '^^^^^^^^^^^^^^^co^^^^^^^o^^^^^^^^^^^^^^^',
    '^^^^^^^^^^^^^^^^oc^^^^^^o^^^^^^^^^^^^^^^',
    '^^^^^^^^^^^^^^^^coc^^^^^o^^^^^^^^^^^^^^^',
    '^^^^^^^^^^^^^^^^^coc^^^^o^^^^^^^^^^^^^^^',
    '^^^^^^^^^^^^^^^^^^coc^^oc^^^^^^^^^^^^^^^',
    '^^^^^^^^^^^^^^^^^^^coccoc^^^^^^^^^^^^^^^',
    '^^^^^^^^^^^^^^^^^^^^cooc^^^^^^^^^^^^^^^^',
    '^^^^^^^^^^^^^^^^^^^^^co^^^^^^^^^^^^^^^^^',
    '^^^^^^^^^^^^^^^^^^^^^^o^^^^^^^^^^^^^^^^^',
    '^^^^^^^^^^^^^^^^^^^^^^o^^^^^^^^^^^^^^^^^',
    '^^^^^^^^^^^^^^^^^^^^^^o^^^^^^^^^^^^^^^^^',
    '^^^^^^^^^^^^^^^^^^^^^^.^^^^^^^^^^^^^^^^^'
];

AREA_STRUCTURES[MapType.MinesLv1] = [
    { id: "Mine Entrance", type: StructureType.MineEntrance, location: new WorldCoordinates(MapType.MinesLv1, new Point(22, 39)) }
];
//# sourceMappingURL=GameMap.js.map
