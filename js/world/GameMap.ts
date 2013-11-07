/// <reference path="../references.ts"/>

enum MapType {
    VillageMap,
    FarmMap,
    MinesLv1
}

/**
 * Dictionary of MapType to ,D array of tiles
 */
var ASCII_MAPS:collections.Dictionary<MapType,Array<string>>;
ASCII_MAPS = new collections.Dictionary<MapType,Array<string>>();

var AREA_STRUCTURES:{[area:string]:IStructure[]};
AREA_STRUCTURES = {};

interface IMapLink {
    LinkA: WorldCoordinates;
    LinkB: WorldCoordinates;
}

var MAP_TO_MAP:IMapLink[] = [];
MAP_TO_MAP.push({LinkA:new WorldCoordinates(MapType.VillageMap, new Point(11, 0)), LinkB:new WorldCoordinates(MapType.FarmMap, new Point(11, 32))});
MAP_TO_MAP.push({LinkA:new WorldCoordinates(MapType.FarmMap, new Point(24, 1)), LinkB:new WorldCoordinates(MapType.MinesLv1, new Point(22, 40))});


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

AREA_STRUCTURES[MapType.VillageMap] =
    [
        {id: "the village gate",                           type: StructureType.Link, location: new WorldCoordinates(MapType.VillageMap, new Point(10, 0)),  resource:CoTWData.Buildings['Gate_NS'] },
        {id: "a locked farm",                              type: StructureType.NA,   location: new WorldCoordinates(MapType.VillageMap, new Point(3, 6)),   resource:CoTWData.Buildings['StrawHouse_EF'] },
        {id: "a locked house",                             type: StructureType.NA,   location: new WorldCoordinates(MapType.VillageMap, new Point(16, 5)),  resource:CoTWData.Buildings['StrawHouse_WF'] },
        {id: "Snorri the Sage",                            type: StructureType.Sage, location: new WorldCoordinates(MapType.VillageMap, new Point(7, 13)),  resource:CoTWData.Buildings['Hut_EF'] },
        {id: "Olaf's Junk Store",                          type: StructureType.Shop, location: new WorldCoordinates(MapType.VillageMap, new Point(14, 12)), resource:CoTWData.Buildings['StrawHouse_WF'],
            goodsType: [], goodsQuality: 0},
        {id: "Bjorn the Blacksmith",                       type: StructureType.Shop, location: new WorldCoordinates(MapType.VillageMap, new Point(6, 17)),  resource:CoTWData.Buildings['StrawHouse_EF'],
            goodsType: [ItemType.Weapon, ItemType.Armour, ItemType.Shield, ItemType.Helmet, ItemType.Bracer, ItemType.Gauntlet], goodsQuality: 1},
        {id: "Gunnhild's General Store",                   type: StructureType.Shop, location: new WorldCoordinates(MapType.VillageMap, new Point(14, 17)), resource:CoTWData.Buildings['StrawHouse_WF'],
            goodsType: [ItemType.Belt, ItemType.Purse, ItemType.Pack, ItemType.Chest, ItemType.PackOfHolding], goodsQuality:1},
        {id: "Shrine of Odin",                             type: StructureType.Shrine, location: new WorldCoordinates(MapType.VillageMap, new Point(9, 22)),  resource:CoTWData.Buildings['HutTemple_NF']},
        {id: "a sign that says: Snorri the Sage",          type: StructureType.Sign, location: new WorldCoordinates(MapType.VillageMap, new Point(9, 14)),  resource:CoTWData.Buildings['Sign']},
        {id: "a sign that says: Olaf's Junk Store",        type: StructureType.Sign, location: new WorldCoordinates(MapType.VillageMap, new Point(13, 12)), resource:CoTWData.Buildings['Sign']},
        {id: "a sign that says: Bjorn the Blacksmith",     type: StructureType.Sign, location: new WorldCoordinates(MapType.VillageMap, new Point(9, 17)),  resource:CoTWData.Buildings['Sign']},
        {id: "a sign that says: Gunnhild's General Store", type: StructureType.Sign, location: new WorldCoordinates(MapType.VillageMap, new Point(13, 17)), resource:CoTWData.Buildings['Sign']},
        {id: "a sign that says: Shrine of Odin",           type: StructureType.Sign, location: new WorldCoordinates(MapType.VillageMap, new Point(12, 21)), resource:CoTWData.Buildings['Sign']},
        {id: "a well",                                     type: StructureType.NA,   location: new WorldCoordinates(MapType.VillageMap, new Point(11, 18)), resource:CoTWData.Buildings['Well']},
        {id: "a wagon",                                    type: StructureType.NA,   location: new WorldCoordinates(MapType.VillageMap, new Point(5, 9)),   resource:CoTWData.Buildings['Wagon']},
        {id: "a vegetable garden",                         type: StructureType.NA,   location: new WorldCoordinates(MapType.VillageMap, new Point(5, 5)),   resource:CoTWData.Buildings['VegePatch']},
        {id: "a flower garden",                            type: StructureType.NA,   location: new WorldCoordinates(MapType.VillageMap, new Point(15, 4)),  resource:CoTWData.Buildings['VegePatch']}
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
    {id: "a village gate",                      type: StructureType.Link,  location: new WorldCoordinates(MapType.FarmMap, new Point(10, 32)), resource:CoTWData.Buildings['Gate_NS']},
    {id: "the burnt remains of your farmhouse", type: StructureType.Quest, location: new WorldCoordinates(MapType.FarmMap, new Point(43, 23)), resource:CoTWData.Buildings['BurntStrawHouse_WF']},
    {id: "the mine entrance",                   type: StructureType.Link,  location: new WorldCoordinates(MapType.FarmMap, new Point(24, 1)),  resource:CoTWData.Buildings['MineEntrance']}
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

AREA_STRUCTURES[MapType.MinesLv1] =
    [
        {id: "the mine exit",   type: StructureType.Link, location:new WorldCoordinates(MapType.MinesLv1, new Point(22, 40)), resource:CoTWData.Buildings['MineEntrance']},
        {id: "stairs down",     type: StructureType.Link, location:new WorldCoordinates(MapType.MinesLv1, new Point(25, 2)), resource:CoTWData.Buildings['StairsDown']}
    ];