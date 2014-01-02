/// <reference path="references.ts"/>

/**
 * Represents an entity in the world. Basically a wrapper for an COTWObject with various components that specify a property
 * or behaviour of the COTWObject.
 */
class Entity {
    cotwItem:ISprite;
    location:WorldCoordinates;
    type:EntityType;
    id:string;
    resourceFile : ResourceFile;

    constructor(id:string, type:EntityType, sprite:ISprite, location:WorldCoordinates) {
        sprite.size = sprite.size || DEFAULT_SIZE;
        this.id = id;
        this.location = location;
        this.cotwItem = sprite;
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

class Point implements IPoint {
    x:number;
    y:number;

    constructor(x?:number, y?:number) {
        this.x = x;
        this.y = y;
    }

    Equals(otherPoint:Point):boolean {
        return (this.x === otherPoint.x && this.y === otherPoint.y);
    }

    Add(otherPoint:Point):Point {
        return new Point(this.x + otherPoint.x, this.y + otherPoint.y);
    }

    Difference(otherPoint:Point):Point {
        return new Point(this.x - otherPoint.x, this.y - otherPoint.y);
    }
}

/**
 * Represents a game item e.g wooden shield
 */
class Item {
    /**
     * When items are created, IDCount is incremented, this class keeps a record of unique item ids
     */
    static IDCount:number = 0;
    /**
     * Holds a set of all items in a game
     */
    static _db:Container;
    public ID:number;
    public base:IItem;
    public container:Container;

    constructor(base:IItem, isContainer:boolean = false) {
        this.ID = Item.GenerateID();
        this.base = base;

        base.sprite.size = base.sprite.size || {x:TILE_SIZE, y:TILE_SIZE};
        base.sprite.file = base.sprite.file || ResourceFile.Items;

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