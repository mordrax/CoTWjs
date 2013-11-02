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

    constructor(id: string, type:EntityType, sprite:Resource, location:WorldCoordinates) {
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
        this.position=position;
        this.area=area;
    }
    Equals(otherWC:WorldCoordinates): boolean {
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

    Add(otherPoint: Point):Point{
        return new Point(this.X + otherPoint.X, this.Y + otherPoint.Y);
    }
}

class TileFactory {
    private _tileCollection:collections.Dictionary<string, {name:string; sprite:Resource}>;
    constructor() {
        this._tileCollection = new collections.Dictionary<string, {name:string; sprite:Resource}>();

        this._tileCollection.setValue('^', {name:'Rock',         sprite: CoTWSprites.Tiles.Rock});
        this._tileCollection.setValue(',', {name:'Grass',        sprite: CoTWSprites.Tiles.Grass});
        this._tileCollection.setValue('o', {name:'DarkDgn',      sprite: CoTWSprites.Tiles.DarkDgn});
        this._tileCollection.setValue('~', {name:'Water',        sprite: CoTWSprites.Tiles.Water});
        this._tileCollection.setValue('.', {name:'Path',         sprite: CoTWSprites.Tiles.Path});
        this._tileCollection.setValue('O', {name:'LitDgn',       sprite: CoTWSprites.Tiles.LitDgn});
        this._tileCollection.setValue('_', {name:'PathRock',     sprite: CoTWSprites.Tiles.PathRock});
        this._tileCollection.setValue(';', {name:'PathGrass',    sprite: CoTWSprites.Tiles.PathGrass});
        this._tileCollection.setValue(' ', {name:'WallDarkDgn',  sprite: CoTWSprites.Tiles.WallDarkDgn});
        this._tileCollection.setValue(' ', {name:'WaterGrass',   sprite: CoTWSprites.Tiles.WaterGrass});
        this._tileCollection.setValue(' ', {name:'WaterPath',    sprite: CoTWSprites.Tiles.WaterPath});
        this._tileCollection.setValue(' ', {name:'WallLitDgn',   sprite: CoTWSprites.Tiles.WallLitDgn});
        this._tileCollection.setValue(' ', {name:'Grass50Cave50',sprite: CoTWSprites.Tiles.Grass50Cave50});
        this._tileCollection.setValue(' ', {name:'Grass10Cave90',sprite: CoTWSprites.Tiles.Grass10Cave90});
        this._tileCollection.setValue(' ', {name:'White50Cave50',sprite: CoTWSprites.Tiles.White50Cave50});
        this._tileCollection.setValue(' ', {name:'White90Cave10',sprite: CoTWSprites.Tiles.White90Cave10});
        this._tileCollection.setValue('=', {name:'Crop',         sprite: CoTWSprites.Tiles.Crop});
        this._tileCollection.setValue('+', {name:'Entry',        sprite: CoTWSprites.Tiles.Entry});
        this._tileCollection.setValue('#', {name:'Building',     sprite: CoTWSprites.Tiles.Building});
        this._tileCollection.setValue('!', {name:'Sign',         sprite: CoTWSprites.Tiles.Sign});
    }

    public Create(asciiTile:string, location:WorldCoordinates):Tile {
        var tile = this._tileCollection.getValue(asciiTile);
        var sprite : Resource = {
            type : tile.sprite.type,
            offset : tile.sprite.offset,
            size : tile.sprite.size,
            turn : tile.sprite.turn
        };
        return new Tile(tile.name, sprite, location);
    }
}

class BuildingFactory {
    private _buildingcollection : collections.Dictionary<StructureType, {entryPoint:Point; sprite:Resource}>;
    constructor() {
        this._buildingcollection = new collections.Dictionary<StructureType, {entryPoint:Point; sprite:Resource}>();

        this._buildingcollection.setValue(StructureType.Gate_NS            , {entryPoint:new Point(1,0), sprite: CoTWSprites.Buildings.Gate_NS      });
        this._buildingcollection.setValue(StructureType.StrawHouse_EF      , {entryPoint:new Point(2,1), sprite: CoTWSprites.Buildings.StrawHouse_EF});
        this._buildingcollection.setValue(StructureType.StrawHouse_WF      , {entryPoint:new Point(0,1), sprite: CoTWSprites.Buildings.StrawHouse_WF});
        this._buildingcollection.setValue(StructureType.Hut_EF             , {entryPoint:new Point(1,0), sprite: CoTWSprites.Buildings.Hut_EF       });
        this._buildingcollection.setValue(StructureType.HutTemple_NF       , {entryPoint:new Point(2,1), sprite: CoTWSprites.Buildings.HutTemple_NF });
        this._buildingcollection.setValue(StructureType.BurntStrawHouse_WF , {entryPoint:new Point(0,1), sprite: CoTWSprites.Buildings.BurntStrawHouse_WF });
    }

    public Create(type:StructureType, id:string, location:WorldCoordinates, goodsType:ItemType[], goodsQuality:number) : Structure {
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
    public ID: number;
    public base: IItem;
    public container: Container;

    constructor(base:IItem, isContainer:boolean=false) {
        this.ID = Item.GenerateID();
        this.base = base;
        if (isContainer) {
            this.container = new Container();
        } else {
            this.container = null;
        }
    }

    static GenerateID():number {
        Item.IDCount++;
        return Item.IDCount;
    }
}

class Container {
    opened: boolean;
    items:{[id:string]:Item};

    constructor() {
        this.opened = true;
        this.items = {};
    }

    public Add(item:Item) {
        this.items[item.ID]=item;
    }
}