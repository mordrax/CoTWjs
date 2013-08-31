/// <reference path="../references.ts"/>

class MapType {
    static VillageMap = 'Village';
    static FarmMap = 'Farm';
}

/**
 * Links MapTypes via points
 */
class MapLink {
    public MapName : string;
    public Coord : Point;
    constructor (map : string,point : Point) {
   this.MapName = map;
   this.Coord = point;
    }
}

/**
 * Dictionary of MapType to ,D array of tiles
 */
var MAPS:collections.Dictionary<string,Array<Array<number>>>;
MAPS = new collections.Dictionary<string,Array<Array<number>>>();

var STRUCTURES:collections.Dictionary<string,Array<Structure>>;
STRUCTURES = new collections.Dictionary<string,Array<Structure>>();

var MAP_TO_MAP : collections.Dictionary<MapLink,MapLink>;
MAP_TO_MAP = new collections.Dictionary<MapLink,MapLink>();

MAP_TO_MAP.setValue(new MapLink(MapType.VillageMap,new Point(11,0)),new MapLink(MapType.FarmMap,new Point(11,32)));

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

STRUCTURES[MapType.VillageMap] = [
    new Structure ('#background',"Village_Gate",StructureType.NS_Gate,new Point(11,0), new Point(10,0), new Point(12,0)),
    new Structure ('#background',"Farm1",StructureType.EF_StrawHouse,new Point(5,6), new Point(3,5), new Point(5,7)),
    new Structure ('#background',"Farm2",StructureType.WF_StrawHouse,new Point(16,6), new Point(16,5), new Point(18,7)),
    new Structure ('#background',"Snorri the Sage",StructureType.EF_Hut,new Point(7,12), new Point(8,12), new Point(8,13)),
    new Structure ('#background',"Olaf's Junk Store",StructureType.WF_StrawHouse,new Point(14,12), new Point(14,11), new Point(16,13)),
    new Structure ('#background',"Bjorn the Blacksmith",StructureType.EF_StrawHouse,new Point(6,17), new Point(8,16), new Point(8,18)),
    new Structure ('#background',"Gunnhild's General Store",StructureType.WF_StrawHouse,new Point(14,17), new Point(14,16), new Point(16,18)),
    new Structure ('#background',"Shrine of Odin",StructureType.NF_HutTemple,new Point(11,21), new Point(9,21), new Point(13,25))
];

MAPS[MapType.FarmMap] = [
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
    ',,,,,,,,,,,,,,,,,,,,,,,;.;,,,,,,,,,,,,,,,,,,,,,,,',
    ',,,,,,,,,,,,,,,,,,,,,,;.;,,,,,,,,,,,,,,,,,,,,,,,,',
    ',,,,,,,,,,,,,,,,,,,,,;.;,,,,,,,,,,,,,,,,,,,,,,,,=',
    ',,,,,,,,,,,,,,,,,,,,;.;,,,,,,,,,,,,,,,,,,,,,,,,,=',
    ',,,,,,,,,,,,,,,,,,,;.;,,,,,,,,,,,,,,,,,,,,,,,,,,=',
    ',,,,,,,,,,,,,,,,,,;.;,,,,,,,,,,,,,,,,,,,,,,####,=',
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

STRUCTURES[MapType.FarmMap] = [
    new Structure ('#background',"HeroBurntFarm",StructureType.WF_BurntStrawHouse,new Point(43,24), new Point(43,22), new Point(46,25))
];