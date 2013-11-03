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
    area:MapType;

    constructor(area:MapType, position:Point) {
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

class TileFactory {
    private _tileCollection:collections.Dictionary<string, {name:string; sprite:Resource}>;

    constructor() {
        this._tileCollection = new collections.Dictionary<string, {name:string; sprite:Resource}>();

        this._tileCollection.setValue('^', {name: 'Rock', sprite: CoTWSprites.Tiles.Rock});
        this._tileCollection.setValue(',', {name: 'Grass', sprite: CoTWSprites.Tiles.Grass});
        this._tileCollection.setValue('o', {name: 'DarkDgn', sprite: CoTWSprites.Tiles.DarkDgn});
        this._tileCollection.setValue('~', {name: 'Water', sprite: CoTWSprites.Tiles.Water});
        this._tileCollection.setValue('.', {name: 'Path', sprite: CoTWSprites.Tiles.Path});
        this._tileCollection.setValue('O', {name: 'LitDgn', sprite: CoTWSprites.Tiles.LitDgn});
        this._tileCollection.setValue('_', {name: 'PathRock', sprite: CoTWSprites.Tiles.PathRock});
        this._tileCollection.setValue(';', {name: 'PathGrass', sprite: CoTWSprites.Tiles.PathGrass});
        this._tileCollection.setValue('z', {name: 'WallDarkDgn', sprite: CoTWSprites.Tiles.WallDarkDgnSW});
        this._tileCollection.setValue('a', {name: 'WallDarkDgn', sprite: CoTWSprites.Tiles.WallDarkDgnNW});
        this._tileCollection.setValue('s', {name: 'WallDarkDgn', sprite: CoTWSprites.Tiles.WallDarkDgnNE});
        this._tileCollection.setValue('x', {name: 'WallDarkDgn', sprite: CoTWSprites.Tiles.WallDarkDgnSE});
        this._tileCollection.setValue(' ', {name: 'WaterGrass', sprite: CoTWSprites.Tiles.WaterGrass});
        this._tileCollection.setValue(' ', {name: 'WaterPath', sprite: CoTWSprites.Tiles.WaterPath});
        this._tileCollection.setValue('Z', {name: 'WallLitDgn', sprite: CoTWSprites.Tiles.WallLitDgnSW});
        this._tileCollection.setValue('A', {name: 'WallLitDgn', sprite: CoTWSprites.Tiles.WallLitDgnNW});
        this._tileCollection.setValue('S', {name: 'WallLitDgn', sprite: CoTWSprites.Tiles.WallLitDgnNE});
        this._tileCollection.setValue('X', {name: 'WallLitDgn', sprite: CoTWSprites.Tiles.WallLitDgnSE});
        this._tileCollection.setValue(' ', {name: 'Grass50Cave50', sprite: CoTWSprites.Tiles.Grass50Cave50});
        this._tileCollection.setValue(' ', {name: 'Grass10Cave90', sprite: CoTWSprites.Tiles.Grass10Cave90});
        this._tileCollection.setValue(' ', {name: 'White50Cave50', sprite: CoTWSprites.Tiles.White50Cave50});
        this._tileCollection.setValue(' ', {name: 'White90Cave10', sprite: CoTWSprites.Tiles.White90Cave10});
        this._tileCollection.setValue('=', {name: 'Crop', sprite: CoTWSprites.Tiles.Crop});
        this._tileCollection.setValue('+', {name: 'EntryOnGrass', sprite: CoTWSprites.Tiles.Grass});
        this._tileCollection.setValue('#', {name: 'BuildingOnGrass', sprite: CoTWSprites.Tiles.Grass});
        this._tileCollection.setValue('!', {name: 'SignOnGrass', sprite: CoTWSprites.Tiles.Grass});
    }

    public Create(asciiTile:string, location:WorldCoordinates):Tile {
        var tile = this._tileCollection.getValue(asciiTile);
        var sprite:Resource = {
            type: tile.sprite.type,
            offset: tile.sprite.offset,
            size: tile.sprite.size,
            turn: tile.sprite.turn
        };
        return new Tile(tile.name, sprite, location);
    }
}

class BuildingFactory {
    private _buildingcollection:collections.Dictionary<StructureType, {entryPoint:Point; sprite:Resource}>;

    constructor() {
        this._buildingcollection = new collections.Dictionary<StructureType, {entryPoint:Point; sprite:Resource}>();

        this._buildingcollection.setValue(StructureType.Gate_NS, {entryPoint: new Point(1, 0), sprite: CoTWSprites.Buildings.Gate_NS      });
        this._buildingcollection.setValue(StructureType.StrawHouse_EF, {entryPoint: new Point(2, 1), sprite: CoTWSprites.Buildings.StrawHouse_EF});
        this._buildingcollection.setValue(StructureType.StrawHouse_WF, {entryPoint: new Point(0, 1), sprite: CoTWSprites.Buildings.StrawHouse_WF});
        this._buildingcollection.setValue(StructureType.Hut_EF, {entryPoint: new Point(1, 0), sprite: CoTWSprites.Buildings.Hut_EF       });
        this._buildingcollection.setValue(StructureType.HutTemple_NF, {entryPoint: new Point(2, 1), sprite: CoTWSprites.Buildings.HutTemple_NF });
        this._buildingcollection.setValue(StructureType.BurntStrawHouse_WF, {entryPoint: new Point(0, 1), sprite: CoTWSprites.Buildings.BurntStrawHouse_WF });
        this._buildingcollection.setValue(StructureType.MineEntrance, {entryPoint: new Point(0, 0), sprite: CoTWSprites.Tiles.MineEntrance });
        this._buildingcollection.setValue(StructureType.Sign, {entryPoint: new Point(0, 0), sprite: CoTWSprites.Tiles.Sign });
        this._buildingcollection.setValue(StructureType.Fountain, {entryPoint: new Point(0, 0), sprite: CoTWSprites.Tiles.Fountain });
        this._buildingcollection.setValue(StructureType.Well, {entryPoint: new Point(0, 0), sprite: CoTWSprites.Tiles.Well });
        this._buildingcollection.setValue(StructureType.VegePatch, {entryPoint: new Point(0, 0), sprite: CoTWSprites.Tiles.VegePatch });
        this._buildingcollection.setValue(StructureType.Wagon, {entryPoint: new Point(0, 0), sprite: CoTWSprites.Tiles.Wagon });
        this._buildingcollection.setValue(StructureType.StairsDown, {entryPoint: new Point(0, 0), sprite: CoTWSprites.Tiles.StairsDown });
        this._buildingcollection.setValue(StructureType.StairsUp, {entryPoint: new Point(0, 0), sprite: CoTWSprites.Tiles.StairsUp });
        this._buildingcollection.setValue(StructureType.DoorClosed, {entryPoint: new Point(0, 0), sprite: CoTWSprites.Tiles.DoorClosed });
        this._buildingcollection.setValue(StructureType.DoorOpen, {entryPoint: new Point(0, 0), sprite: CoTWSprites.Tiles.DoorOpen });
    }

    public Create(type:StructureType, id:string, location:WorldCoordinates, goodsType:ItemType[], goodsQuality:number):Structure {
        var struc = this._buildingcollection.getValue(type);
        if (!!goodsType) {
            var inventory = new ShopInventory(goodsType, goodsQuality);
            return new Shop(id, type, struc.entryPoint, struc.sprite, location, inventory);
        } else {
            return new Structure(id, type, struc.entryPoint, struc.sprite, location);
        }
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

    static DB(): Container {
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
        return "item-"+item.ID;
    }
}

class Container {
    opened:boolean;
    items:{[id:string]:Item};

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