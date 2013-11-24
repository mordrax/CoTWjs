/// <reference path="references.ts"/>

/**
 * Represents an entity in the world. Basically a wrapper for an COTWObject with various components that specify a property
 * or behaviour of the COTWObject.
 */
class Entity {
    sprite:Resource;
    location:WorldCoordinates;
    type:EntityType;
    id:string;

    constructor(id:string, type:EntityType, sprite:Resource, location:WorldCoordinates) {
        this.id = id;
        this.location = location;
        this.sprite = sprite;
        this.type = type;
    }
}

class WorldCoordinates {
    position:Point;
    area:GameArea;

    constructor(area:GameArea, position:Point) {
        this.position = position;
        this.area = area;
    }

    Equals(otherWC:WorldCoordinates):boolean {
        return this.area == otherWC.area && this.position.Equals(otherWC.position);
    }
}

class Point {
    X:number;
    Y:number;

    constructor(x?:number, y?:number) {
        this.X = x;
        this.Y = y;
    }

    Equals(otherPoint:Point):boolean {
        return (this.X === otherPoint.X && this.Y === otherPoint.Y);
    }

    Add(otherPoint:Point):Point {
        return new Point(this.X + otherPoint.X, this.Y + otherPoint.Y);
    }

    Difference(otherPoint:Point):Point {
        return new Point(this.X - otherPoint.X, this.Y - otherPoint.Y);
    }
}

interface TileResource {
    name:string;
    sprite:Resource;
}
interface BuildingResource {
    entryPoint:Point;
    sprite:Resource;
}
interface ICoTWData {
    Tiles:{[id:string]:TileResource};
    Buildings:{[id:string]:BuildingResource};
}
var CoTWData:ICoTWData = {
    Tiles: {
        '^': {name: 'Rock', sprite: CoTWSprites.Tiles.Rock},
        ',': {name: 'Grass', sprite: CoTWSprites.Tiles.Grass},
        'o': {name: 'DarkDgn', sprite: CoTWSprites.Tiles.DarkDgn},
        '~': {name: 'Water', sprite: CoTWSprites.Tiles.Water},
        '.': {name: 'Path', sprite: CoTWSprites.Tiles.Path},
        'O': {name: 'LitDgn', sprite: CoTWSprites.Tiles.LitDgn},
        '_': {name: 'PathRock', sprite: CoTWSprites.Tiles.PathRock},
        ';': {name: 'PathGrass', sprite: CoTWSprites.Tiles.PathGrass},
        'd': {name: 'WallDarkDgn', sprite: CoTWSprites.Tiles.WallDarkDgn},
        'w': {name: 'WaterGrass', sprite: CoTWSprites.Tiles.WaterGrass},
        'W': {name: 'WaterPath', sprite: CoTWSprites.Tiles.WaterPath},
        'D': {name: 'WallLitDgn', sprite: CoTWSprites.Tiles.WallLitDgn},
        'g': {name: 'Grass50Cave50', sprite: CoTWSprites.Tiles.Grass50Cave50},
        'G': {name: 'Grass10Cave90', sprite: CoTWSprites.Tiles.Grass10Cave90},
        'c': {name: 'White50Cave50', sprite: CoTWSprites.Tiles.White50Cave50},
        'C': {name: 'White90Cave10', sprite: CoTWSprites.Tiles.White90Cave10},
        '=': {name: 'Crop', sprite: CoTWSprites.Tiles.Crop},
        '+': {name: 'EntryOnGrass', sprite: CoTWSprites.Tiles.Grass},
        '#': {name: 'BuildingOnGrass', sprite: CoTWSprites.Tiles.Grass},
        '!': {name: 'SignOnGrass', sprite: CoTWSprites.Tiles.Grass}
    },
    Buildings: {
        Gate_NS: {entryPoint: new Point(1, 0), sprite: CoTWSprites.Buildings.Gate_NS },
        StrawHouse_EF: {entryPoint: new Point(2, 1), sprite: CoTWSprites.Buildings.StrawHouse_EF      },
        StrawHouse_WF: {entryPoint: new Point(0, 1), sprite: CoTWSprites.Buildings.StrawHouse_WF      },
        Hut_EF: {entryPoint: new Point(1, 0), sprite: CoTWSprites.Buildings.Hut_EF             },
        HutTemple_NF: {entryPoint: new Point(2, 1), sprite: CoTWSprites.Buildings.HutTemple_NF       },
        BurntStrawHouse_WF: {entryPoint: new Point(0, 1), sprite: CoTWSprites.Buildings.BurntStrawHouse_WF },
        MineEntrance: {entryPoint: new Point(0, 0), sprite: CoTWSprites.Tiles.MineEntrance           },
        Sign: {entryPoint: new Point(0, 0), sprite: CoTWSprites.Tiles.Sign                   },
        Fountain: {entryPoint: new Point(0, 0), sprite: CoTWSprites.Tiles.Fountain               },
        Well: {entryPoint: new Point(0, 0), sprite: CoTWSprites.Tiles.Well                   },
        VegePatch: {entryPoint: new Point(0, 0), sprite: CoTWSprites.Tiles.VegePatch              },
        Wagon: {entryPoint: new Point(0, 0), sprite: CoTWSprites.Tiles.Wagon                  },
        StairsDown: {entryPoint: new Point(0, 0), sprite: CoTWSprites.Tiles.StairsDown             },
        StairsUp: {entryPoint: new Point(0, 0), sprite: CoTWSprites.Tiles.StairsUp               },
        DoorClosed: {entryPoint: new Point(0, 0), sprite: CoTWSprites.Tiles.DoorClosed             },
        DoorOpen: {entryPoint: new Point(0, 0), sprite: CoTWSprites.Tiles.DoorOpen               }
    }

}

class Item {
    static IDCount:number = 0;
    static _db:Container;
    public ID:number;
    public base:IItem;
    public container:Container;

    constructor(base:IItem, isContainer:boolean = false) {
        this.ID = Item.GenerateID();
        this.base = base;
        if (isContainer) {
            this.container = new Container();
        } else {
            this.container = null;
        }

        //register item with db
        Item.DB().Add(this);
    }

    static DB():Container {
        if (Item._db == undefined) {
            Item._db = new Container();
        }

        return Item._db;
    }

    static GenerateID():number {
        Item.IDCount++;
        return Item.IDCount;
    }

    static GetIDString(item:Item) {
        return "item-" + item.ID;
    }
}

class Container {
    opened:boolean;
    items:{[id:string]:Item
    };

    constructor() {
        this.opened = true;
        this.items = {};
    }

    public Add(item:Item) {
        this.items[item.ID] = item;
    }

    public Take(id:string):Item {
        var item = this.items[id];
        delete this.items[id];
        return item;
    }
}