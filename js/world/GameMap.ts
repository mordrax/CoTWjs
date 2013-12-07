/// <reference path="../references.ts"/>

enum GameArea {
    Village,
    Farm,
    MinesLv1,
    MinesLv2
}

/**
 * Dictionary of GameArea to ,D array of tiles
 */
var ASCII_MAPS:{[gameArea:string]:string[]} = {};

var AREA_STRUCTURES:{[gameArea:string]:IStructure[]} = {};

var MAP_TO_MAP:IMapLink[] = [
{LinkA:new WorldCoordinates(GameArea.Village, new Point(11, 0)), LinkB:new WorldCoordinates(GameArea.Farm, new Point(11, 32))},
{LinkA:new WorldCoordinates(GameArea.Farm, new Point(24, 1)), LinkB:new WorldCoordinates(GameArea.MinesLv1, new Point(22, 40))},
{LinkA:new WorldCoordinates(GameArea.Village, new Point(11, 18)), LinkB:new WorldCoordinates(GameArea.MinesLv1, new Point(22, 40))},
{LinkA:new WorldCoordinates(GameArea.MinesLv1, new Point(25, 2)), LinkB:new WorldCoordinates(GameArea.MinesLv2, new Point(0,0))}
]

ASCII_MAPS[GameArea.Village] = [
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

AREA_STRUCTURES[GameArea.Village] =
    [
        {id: "the village gate",                           type: StructureType.Link, location: new WorldCoordinates(GameArea.Village, new Point(10, 0)),  resource:CoTWContent.Buildings.Gate_NS},
        {id: "a locked farm",                              type: StructureType.NA,   location: new WorldCoordinates(GameArea.Village, new Point(3, 6)),   resource:CoTWContent.Buildings.StrawHouse_EF},
        {id: "a locked house",                             type: StructureType.NA,   location: new WorldCoordinates(GameArea.Village, new Point(16, 5)),  resource:CoTWContent.Buildings.StrawHouse_WF},
        {id: "Snorri the Sage",                            type: StructureType.Sage, location: new WorldCoordinates(GameArea.Village, new Point(7, 13)),  resource:CoTWContent.Buildings.Hut_EF},
        {id: "Olaf's Junk Store",                          type: StructureType.Shop, location: new WorldCoordinates(GameArea.Village, new Point(14, 12)), resource:CoTWContent.Buildings.StrawHouse_WF,
            goodsType: [], goodsQuality: 0},
        {id: "Bjorn the Blacksmith",                       type: StructureType.Shop, location: new WorldCoordinates(GameArea.Village, new Point(6, 17)),  resource:CoTWContent.Buildings.StrawHouse_EF,
            goodsType: [ItemType.Weapon, ItemType.Armour, ItemType.Shield, ItemType.Helmet, ItemType.Bracer, ItemType.Gauntlet], goodsQuality: 1},
        {id: "Gunnhild's General Store",                   type: StructureType.Shop, location: new WorldCoordinates(GameArea.Village, new Point(14, 17)), resource:CoTWContent.Buildings.StrawHouse_WF,
            goodsType: [ItemType.Belt, ItemType.Purse, ItemType.Pack, ItemType.Chest, ItemType.PackOfHolding], goodsQuality:1},
        {id: "Shrine of Odin",                             type: StructureType.Shrine, location: new WorldCoordinates(GameArea.Village, new Point(9, 22)),  resource:CoTWContent.Buildings.HutTemple_NF},
        {id: "a sign that says: Snorri the Sage",          type: StructureType.Sign, location: new WorldCoordinates(GameArea.Village, new Point(9, 14)),  resource:CoTWContent.Buildings.Sign},
        {id: "a sign that says: Olaf's Junk Store",        type: StructureType.Sign, location: new WorldCoordinates(GameArea.Village, new Point(13, 12)), resource:CoTWContent.Buildings.Sign},
        {id: "a sign that says: Bjorn the Blacksmith",     type: StructureType.Sign, location: new WorldCoordinates(GameArea.Village, new Point(9, 17)),  resource:CoTWContent.Buildings.Sign},
        {id: "a sign that says: Gunnhild's General Store", type: StructureType.Sign, location: new WorldCoordinates(GameArea.Village, new Point(13, 17)), resource:CoTWContent.Buildings.Sign},
        {id: "a sign that says: Shrine of Odin",           type: StructureType.Sign, location: new WorldCoordinates(GameArea.Village, new Point(12, 21)), resource:CoTWContent.Buildings.Sign},
        {id: "a well",                                     type: StructureType.Link, location: new WorldCoordinates(GameArea.Village, new Point(11, 18)), resource:CoTWContent.Buildings.Well},
        {id: "a wagon",                                    type: StructureType.NA,   location: new WorldCoordinates(GameArea.Village, new Point(5, 9)),   resource:CoTWContent.Buildings.Wagon},
        {id: "a vegetable garden",                         type: StructureType.NA,   location: new WorldCoordinates(GameArea.Village, new Point(5, 5)),   resource:CoTWContent.Buildings.VegePatch},
        {id: "a flower garden",                            type: StructureType.NA,   location: new WorldCoordinates(GameArea.Village, new Point(15, 4)),  resource:CoTWContent.Buildings.VegePatch}
    ];

ASCII_MAPS[GameArea.Farm] = [
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

AREA_STRUCTURES[GameArea.Farm] = [
    {id: "a village gate",                      type: StructureType.Link,  location: new WorldCoordinates(GameArea.Farm, new Point(10, 32)), resource:CoTWContent.Buildings.Gate_NS},
    {id: "the burnt remains of your farmhouse", type: StructureType.Quest, location: new WorldCoordinates(GameArea.Farm, new Point(43, 23)), resource:CoTWContent.Buildings['BurntStrawHouse_WF']},
    {id: "the mine entrance",                   type: StructureType.Link,  location: new WorldCoordinates(GameArea.Farm, new Point(24, 1)),  resource:CoTWContent.Buildings['MineEntrance']}
];

ASCII_MAPS[GameArea.MinesLv1] = [
    '^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^',
    '^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^',
    '^^^^^^^^^^^^^^^^^^^dooo^^ood^^^^^^^^^^^^^',
    '^^^^^^^^^^^^^^^^^doooooddooo^^^^^^^^^^^^^',
    '^^^^^^^^^^^^^^^^doddoooooooo^^^^^^^^^^^^^',
    '^^^^^^^^^^^^^^^dod^^oooo^ooo^^^^^^^^^^^^^',
    '^^^^^^^^^^^^^^^od^^^oooo^ooo^^^^^^^^^^^^^',
    '^^^^^^^^^^^^^^^o^^^^dooo^ooo^^^^^^^^^^^^^',
    '^^^^^^^^^^^^^^^o^^^^^dod^dod^^^^^^^^^^^^^',
    '^^^^^^^^^^^^^^^od^^^^^^^^^^^^^^^^^^^^^^^^',
    '^^^^^^^^^^^^^^^dod^^^^^^^^^^^^^^^^^^^^^^^',
    '^^^^^^^^^^^^^^^^dod^^^^^^^^^^^^^^^^^^^^^^',
    '^^^^^^^^^^^^^^^^^do^^^^^^^^^^^^^^^^^^^^^^',
    '^^^^^^^^^^^^^^^^^^o^^^^^^^^^^^^^^^^^^^^^^',
    '^^^^^^^^^^^^^^^^^^od^^^^^^^^^^^^^^^^^^^^^',
    '^^^^^^^^^^^^^^^^^^dod^^^^^^^^^^^^^^^^^^^^',
    '^^^^^^^^^^^^^^^^^^^dod^^^^^^^^^^^^^^^^^^^',
    '^^^^^^^^^^^^^^^^^^^^dod^^^^^^^^^^^^^^^^^^',
    '^^^^^^^^^^^^^^^^^^^^^do^^^^^^^^^^^^^^^^^^',
    '^^^^^^^^^^^^dood^^^^^^o^^^^^^^^^^^^^^^^^^',
    '^^^^^^^^^^^^ooood^^^^^o^^^^^^^^^^doood^^^',
    '^^^^^^^^^^^^oooooo^^^^o^^^^^^^^^^ooooo^^^',
    '^^^^^^^^^^^^dooooo^^^^o^^^^^^^^^^ooooo^^^',
    '^^^^^^^^^^^^^o^^^^^^^^o^^^^^^^^^dooooo^^^',
    '^^^^^^^^^^^^^o^^^^^^^^o^^^^^dooooooooo^^^',
    '^^^^^^^^^^^^^o^^^^^^^^o^^^^dod^^^doooo^^^',
    '^^^^^^^^^^^^^od^^^^^^^od^^dod^^^^^^^oo^^^',
    '^^^^^^^^^^^^^dod^^^^^^doddod^^^^^^^ood^^^',
    '^^^^^^^^^^^^^^dod^^^^^^dood^^^^^^^^^^^^^^',
    '^^^^^^^^^^^^^^^do^^^^^^^o^^^^^^^^^^^^^^^^',
    '^^^^^^^^^^^^^^^^od^^^^^^o^^^^^^^^^^^^^^^^',
    '^^^^^^^^^^^^^^^^dod^^^^^o^^^^^^^^^^^^^^^^',
    '^^^^^^^^^^^^^^^^^dod^^^do^^^^^^^^^^^^^^^^',
    '^^^^^^^^^^^^^^^^^^dod^^od^^^^^^^^^^^^^^^^',
    '^^^^^^^^^^^^^^^^^^^doddo^^^^^^^^^^^^^^^^^',
    '^^^^^^^^^^^^^^^^^^^^dood^^^^^^^^^^^^^^^^^',
    '^^^^^^^^^^^^^^^^^^^^^do^^^^^^^^^^^^^^^^^^',
    '^^^^^^^^^^^^^^^^^^^^^^o^^^^^^^^^^^^^^^^^^',
    '^^^^^^^^^^^^^^^^^^^^^^o^^^^^^^^^^^^^^^^^^',
    '^^^^^^^^^^^^^^^^^^^^^^o^^^^^^^^^^^^^^^^^^',
    '^^^^^^^^^^^^^^^^^^^^^^.^^^^^^^^^^^^^^^^^^'
];

AREA_STRUCTURES[GameArea.MinesLv1] =
    [
        {id: "the mine exit",   type: StructureType.Link, location:new WorldCoordinates(GameArea.MinesLv1, new Point(22, 40)), resource:CoTWContent.Buildings['MineEntrance']},
        {id: "stairs down",     type: StructureType.Link, location:new WorldCoordinates(GameArea.MinesLv1, new Point(25, 2)), resource:CoTWContent.Buildings['StairsDown']}
    ];