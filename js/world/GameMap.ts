/// <reference path="../references.ts"/>

enum MapType {
    VillageMap,
    FarmMap
}

/**
 * Links MapTypes via points
 */
class MapLink {
    public MapName : MapType;
    public Coord : Point;
    constructor (map : MapType, point : Point) {
        this.MapName = map;
        this.Coord = point;
    }
}

/**
 * Dictionary of MapType to ,D array of tiles
 */
var ASCII_MAPS:collections.Dictionary<MapType,Array<string>>;
ASCII_MAPS = new collections.Dictionary<MapType,Array<string>>();

var AREA_STRUCTURES: {[area:string]:IStructure[]};
AREA_STRUCTURES = {};

var MAP_TO_MAP : collections.Dictionary<MapLink,MapLink>;
MAP_TO_MAP = new collections.Dictionary<MapLink,MapLink>();

MAP_TO_MAP.setValue(new MapLink(MapType.VillageMap,new Point(11,0)),new MapLink(MapType.FarmMap,new Point(11,32)));

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
'======,,,##+##,,,=======',
'======,,,#####,,,=======',
'======,,,#####,,,=======',
'======,,,#####,,,=======',
'======,,,#####,,,=======',
'======,,,,,,,,,,,======='
];

AREA_STRUCTURES[MapType.VillageMap] =
    [
    {id:"Village_Gate",             type:StructureType.Gate_NS,       location:new WorldCoordinates(MapType.VillageMap, new Point(10,0 ))},
    {id:"Farm1",                    type:StructureType.StrawHouse_EF, location:new WorldCoordinates(MapType.VillageMap, new Point(3 ,6 ))},
    {id:"Farm2",                    type:StructureType.StrawHouse_WF, location:new WorldCoordinates(MapType.VillageMap, new Point(16,5 ))},
    {id:"Snorri the Sage",          type:StructureType.Hut_EF,        location:new WorldCoordinates(MapType.VillageMap, new Point(7 ,13))},
    {id:"Olaf's Junk Store",        type:StructureType.StrawHouse_WF, location:new WorldCoordinates(MapType.VillageMap, new Point(14,12))},
    {id:"Bjorn the Blacksmith",     type:StructureType.StrawHouse_EF, location:new WorldCoordinates(MapType.VillageMap, new Point(6 ,17))},
    {id:"Gunnhild's General Store", type:StructureType.StrawHouse_WF, location:new WorldCoordinates(MapType.VillageMap, new Point(14,17))},
    {id:"Shrine of Odin",           type:StructureType.HutTemple_NF,  location:new WorldCoordinates(MapType.VillageMap, new Point(9 ,22))}
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
    ',,,,,,,,,,,,,,,,,;.;,,,,,,,,,,,,,,,,,,,,,,,####,=',
    ',,,,,,,,,,,,,,,,;..........................+###,=',
    ',,,,,,,,,,,,,,,;.;,,,,,,,,,,,,,,,,,,,,,,,,,####,=',
    ',,,,,,,,,,,,,,;.;,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,=',
    ',,,,,,,,,,,,,;.;,,,,,,,,,,,,,,,,,,,,,,,,,,=======',
    ',,,,,,,,,,,,;.;,,,,,,,,,,,,,,,,,,,,,,,,,,,=======',
    '========,,,;.;,,,,,,,,,,,,,,,,,,,,,,,,,,,,=======',
    '========,,,.;,,,,,,,,,,,,,,,,,,,,,,,,,,,,,=======',
    '========,,,.,,,,,=======,,,,,,,,,,,,,,,,,,=======',
    '========,,#+#,,,,=======,,,,,,,,,,,,,,,,,,,,,,,,,'
];

AREA_STRUCTURES[MapType.FarmMap] = [
    //TODO: fix structures
    //new Structure ("HeroBurntFarm","WF_BurntStrawHouse",new Point(0,2), new Point(43,22), new Point(3,3), new Point(3,0))
];