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

var MAP_TO_MAP = [];
MAP_TO_MAP.push({ LinkA: new WorldCoordinates(MapType.VillageMap, new Point(11, 0)), LinkB: new WorldCoordinates(MapType.FarmMap, new Point(11, 32)) });
MAP_TO_MAP.push({ LinkA: new WorldCoordinates(MapType.FarmMap, new Point(24, 1)), LinkB: new WorldCoordinates(MapType.MinesLv1, new Point(22, 39)) });

ASCII_MAPS[MapType.VillageMap] = [
    '========,,#+#,,,========',
    '========,,,.,,,,========',
    '========,,,.,,,,========',
    '========,,,.,,,,========',
    '========,,,.,,,#========',
    '===,,#,,;...,,,,###=====',
    '===###,;.;,.,,;.+##=====',
    '===##+..;,,.,;.;###=====',
    '===###,,,,,...;,,,,,,===',
    '===,,#,,,,,.,,,,,,,,,===',
    '====,,,,,,,.,,,,,,,,,===',
    '====,,,,,,,.,,,,,,,,,===',
    '====,,,,,,,.,!###,,,,===',
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
    { id: "the village gate", type: StructureType.Gate_NS, location: new WorldCoordinates(MapType.VillageMap, new Point(10, 0)) },
    { id: "a locked farm", type: StructureType.StrawHouse_EF, location: new WorldCoordinates(MapType.VillageMap, new Point(3, 6)) },
    { id: "a locked house", type: StructureType.StrawHouse_WF, location: new WorldCoordinates(MapType.VillageMap, new Point(16, 5)) },
    { id: "Snorri the Sage", type: StructureType.Hut_EF, location: new WorldCoordinates(MapType.VillageMap, new Point(7, 13)) },
    { id: "Olaf's Junk Store", type: StructureType.StrawHouse_WF, location: new WorldCoordinates(MapType.VillageMap, new Point(14, 12)) },
    {
        id: "Bjorn the Blacksmith",
        type: StructureType.StrawHouse_EF,
        location: new WorldCoordinates(MapType.VillageMap, new Point(6, 17)),
        goodsType: [ItemType.Weapon, ItemType.Armour, ItemType.Shield, ItemType.Helmet, ItemType.Bracer, ItemType.Gauntlet],
        goodsQuality: 1
    },
    {
        id: "Gunnhild's General Store",
        type: StructureType.StrawHouse_WF,
        location: new WorldCoordinates(MapType.VillageMap, new Point(14, 17)),
        goodsType: [ItemType.Belt, ItemType.Purse, ItemType.Pack, ItemType.Chest, ItemType.PackOfHolding],
        goodsQuality: 1
    },
    { id: "Shrine of Odin", type: StructureType.HutTemple_NF, location: new WorldCoordinates(MapType.VillageMap, new Point(9, 22)) },
    { id: "a sign that says: Snorri the Sage", type: StructureType.Sign, location: new WorldCoordinates(MapType.VillageMap, new Point(9, 14)) },
    { id: "a sign that says: Olaf's Junk Store", type: StructureType.Sign, location: new WorldCoordinates(MapType.VillageMap, new Point(13, 12)) },
    { id: "a sign that says: Bjorn the Blacksmith", type: StructureType.Sign, location: new WorldCoordinates(MapType.VillageMap, new Point(9, 17)) },
    { id: "a sign that says: Gunnhild's General Store", type: StructureType.Sign, location: new WorldCoordinates(MapType.VillageMap, new Point(13, 17)) },
    { id: "a sign that says: Shrine of Odin", type: StructureType.Sign, location: new WorldCoordinates(MapType.VillageMap, new Point(12, 21)) },
    { id: "a well", type: StructureType.Well, location: new WorldCoordinates(MapType.VillageMap, new Point(11, 18)) },
    { id: "a wagon", type: StructureType.Wagon, location: new WorldCoordinates(MapType.VillageMap, new Point(5, 9)) },
    { id: "a vegetable garden", type: StructureType.VegePatch, location: new WorldCoordinates(MapType.VillageMap, new Point(5, 5)) },
    { id: "a flower garden", type: StructureType.VegePatch, location: new WorldCoordinates(MapType.VillageMap, new Point(15, 4)) }
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
    '^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^',
    '^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^',
    '^^^^^^^^^^^^^^^^^^^aooo^^oos^^^^^^^^^^^^^',
    '^^^^^^^^^^^^^^^^^aooooosaooo^^^^^^^^^^^^^',
    '^^^^^^^^^^^^^^^^aoxzoooooooo^^^^^^^^^^^^^',
    '^^^^^^^^^^^^^^^aox^^oooo^ooo^^^^^^^^^^^^^',
    '^^^^^^^^^^^^^^^ox^^^oooo^ooo^^^^^^^^^^^^^',
    '^^^^^^^^^^^^^^^o^^^^zooo^ooo^^^^^^^^^^^^^',
    '^^^^^^^^^^^^^^^o^^^^^zox^zox^^^^^^^^^^^^^',
    '^^^^^^^^^^^^^^^os^^^^^^^^^^^^^^^^^^^^^^^^',
    '^^^^^^^^^^^^^^^zos^^^^^^^^^^^^^^^^^^^^^^^',
    '^^^^^^^^^^^^^^^^zos^^^^^^^^^^^^^^^^^^^^^^',
    '^^^^^^^^^^^^^^^^^zo^^^^^^^^^^^^^^^^^^^^^^',
    '^^^^^^^^^^^^^^^^^^o^^^^^^^^^^^^^^^^^^^^^^',
    '^^^^^^^^^^^^^^^^^^os^^^^^^^^^^^^^^^^^^^^^',
    '^^^^^^^^^^^^^^^^^^zos^^^^^^^^^^^^^^^^^^^^',
    '^^^^^^^^^^^^^^^^^^^zos^^^^^^^^^^^^^^^^^^^',
    '^^^^^^^^^^^^^^^^^^^^zos^^^^^^^^^^^^^^^^^^',
    '^^^^^^^^^^^^^^^^^^^^^zo^^^^^^^^^^^^^^^^^^',
    '^^^^^^^^^^^^aoos^^^^^^o^^^^^^^^^^^^^^^^^^',
    '^^^^^^^^^^^^oooos^^^^^o^^^^^^^^^^aooos^^^',
    '^^^^^^^^^^^^oooooo^^^^o^^^^^^^^^^ooooo^^^',
    '^^^^^^^^^^^^zooooo^^^^o^^^^^^^^^^ooooo^^^',
    '^^^^^^^^^^^^^o^^^^^^^^o^^^^^^^^^aooooo^^^',
    '^^^^^^^^^^^^^o^^^^^^^^o^^^^^aooooooooo^^^',
    '^^^^^^^^^^^^^o^^^^^^^^o^^^^aox^^^zoooo^^^',
    '^^^^^^^^^^^^^os^^^^^^^os^^aox^^^^^^^oo^^^',
    '^^^^^^^^^^^^^zos^^^^^^zosaox^^^^^^^oox^^^',
    '^^^^^^^^^^^^^^zos^^^^^^zoox^^^^^^^^^^^^^^',
    '^^^^^^^^^^^^^^^zo^^^^^^^o^^^^^^^^^^^^^^^^',
    '^^^^^^^^^^^^^^^^os^^^^^^o^^^^^^^^^^^^^^^^',
    '^^^^^^^^^^^^^^^^zos^^^^^o^^^^^^^^^^^^^^^^',
    '^^^^^^^^^^^^^^^^^zos^^^ao^^^^^^^^^^^^^^^^',
    '^^^^^^^^^^^^^^^^^^zos^^ox^^^^^^^^^^^^^^^^',
    '^^^^^^^^^^^^^^^^^^^zosao^^^^^^^^^^^^^^^^^',
    '^^^^^^^^^^^^^^^^^^^^zoox^^^^^^^^^^^^^^^^^',
    '^^^^^^^^^^^^^^^^^^^^^zo^^^^^^^^^^^^^^^^^^',
    '^^^^^^^^^^^^^^^^^^^^^^o^^^^^^^^^^^^^^^^^^',
    '^^^^^^^^^^^^^^^^^^^^^^o^^^^^^^^^^^^^^^^^^',
    '^^^^^^^^^^^^^^^^^^^^^^o^^^^^^^^^^^^^^^^^^',
    '^^^^^^^^^^^^^^^^^^^^^^.^^^^^^^^^^^^^^^^^^'
];

AREA_STRUCTURES[MapType.MinesLv1] = [
    { id: "Mine Entrance", type: StructureType.MineEntrance, location: new WorldCoordinates(MapType.MinesLv1, new Point(22, 39)) },
    { id: "Stairs Down", type: StructureType.StairsDown, location: new WorldCoordinates(MapType.MinesLv1, new Point(25, 2)) }
];
//# sourceMappingURL=GameMap.js.map
