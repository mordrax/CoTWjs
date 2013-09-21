/// <reference path="references.ts"/>

/**
 * This file is a collection of internal classes created and used by CoTW.
 * Until there is an easier way to create and reference all typescript files, this file is a dumping ground for all
 * classes that should be separate from the main controllers but is too small to put into it's own individual class.
 */
enum EntityType {
    Actor,
    Building,
    Tile
}
/**
 * Represents an entity in the world. Basically a wrapper for an COTWObject with various components that specify a property
 * or behaviour of the COTWObject.
 */
class Entity {
    sprite:IResource;
    location:WorldCoordinates;
    type:EntityType;
    id:string;

    constructor(id: string, type:EntityType, sprite:IResource, location?:WorldCoordinates) {
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
}

class TileFactory {
    private _tileCollection:collections.Dictionary<string, {name:string; sprite:IResource}>;
    constructor() {
        this._tileCollection = new collections.Dictionary<string, {name:string; sprite:IResource}>();

        this._tileCollection.setValue('^', {name:'Rock',         sprite: Sprites.Tiles.Rock});
        this._tileCollection.setValue(',', {name:'Grass',        sprite: Sprites.Tiles.Grass});
        this._tileCollection.setValue('o', {name:'DarkDgn',      sprite: Sprites.Tiles.DarkDgn});
        this._tileCollection.setValue('~', {name:'Water',        sprite: Sprites.Tiles.Water});
        this._tileCollection.setValue('.', {name:'Path',         sprite: Sprites.Tiles.Path});
        this._tileCollection.setValue('O', {name:'LitDgn',       sprite: Sprites.Tiles.LitDgn});
        this._tileCollection.setValue('_', {name:'PathRock',     sprite: Sprites.Tiles.PathRock});
        this._tileCollection.setValue(';', {name:'PathGrass',    sprite: Sprites.Tiles.PathGrass});
        this._tileCollection.setValue(' ', {name:'WallDarkDgn',  sprite: Sprites.Tiles.WallDarkDgn});
        this._tileCollection.setValue(' ', {name:'WaterGrass',   sprite: Sprites.Tiles.WaterGrass});
        this._tileCollection.setValue(' ', {name:'WaterPath',    sprite: Sprites.Tiles.WaterPath});
        this._tileCollection.setValue(' ', {name:'WallLitDgn',   sprite: Sprites.Tiles.WallLitDgn});
        this._tileCollection.setValue(' ', {name:'Grass50Cave50',sprite: Sprites.Tiles.Grass50Cave50});
        this._tileCollection.setValue(' ', {name:'Grass10Cave90',sprite: Sprites.Tiles.Grass10Cave90});
        this._tileCollection.setValue(' ', {name:'White50Cave50',sprite: Sprites.Tiles.White50Cave50});
        this._tileCollection.setValue(' ', {name:'White90Cave10',sprite: Sprites.Tiles.White90Cave10});
        this._tileCollection.setValue('=', {name:'Crop',         sprite: Sprites.Tiles.Crop});
        this._tileCollection.setValue('+', {name:'Entry',        sprite: Sprites.Tiles.Entry});
        this._tileCollection.setValue('#', {name:'Building',     sprite: Sprites.Tiles.Building});
        this._tileCollection.setValue('!', {name:'Sign',         sprite: Sprites.Tiles.Sign});
    }

    public Create(asciiTile:string):Tile {
        var tile = this._tileCollection.getValue(asciiTile);
        return new Tile(tile.name, tile.sprite);
    }
}