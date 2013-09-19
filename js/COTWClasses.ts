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
    sprite:Sprite;
    location:WorldCoordinates;
    type:EntityType;
    id:string;

    constructor(id: string, type:EntityType, sprite:Sprite, location?:WorldCoordinates) {
        this.id = id;
        this.location = location;
        this.sprite = sprite;
        this.type = type;
    }
}

enum Sprites {
    Player,
    Rock,
    Grass,
    DarkDgn,
    Water,
    Path,
    LitDgn,
    PathRock,
    PathGrass,
    WallDarkDgn,
    WaterGrass,
    WaterPath,
    WallLitDgn,
    Grass50Cave50,
    Grass10Cave90,
    White50Cave50,
    White90Cave10,
    Crop,
    Entry,
    Building,
    Sign
}

class Sprite {
    imgSprites:Sprites;
    imgOffset:Point;
    imgSize:Point;

    constructor(src:Sprites, offset:Point, size:Point=new Point(TILE_SIZE, TILE_SIZE)) {
        this.imgSprites = src;
        this.imgOffset = offset;
        this.imgSize = size;
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

class TileData {
    name : string;
    sprite : Sprite;
    constructor(name:string, sprite:Sprite) {
        this.name = name;
        this.sprite = sprite;
    }
}

class TileFactory {
    private _tileCollection:collections.Dictionary<string, Tile>;
    public static Img:HTMLImageElement;

    constructor() {
        this._tileCollection = new collections.Dictionary<string, Tile>();
        TileFactory.Img = document.createElement('img');
        TileFactory.Img.src = "assets/resources/tiles.png";

        this._tileCollection.setValue('^', new Tile("Rock",          new Sprite(Sprites.Rock, new Point(0  ,0  ))));
        this._tileCollection.setValue(',', new Tile("Grass",         new Sprite(Sprites.Grass, new Point(0  ,32 ))));
        this._tileCollection.setValue('o', new Tile("DarkDgn",       new Sprite(Sprites.DarkDgn, new Point(0  ,64 ))));
        this._tileCollection.setValue('~', new Tile("Water",         new Sprite(Sprites.Water, new Point(0  ,96 ))));
        this._tileCollection.setValue('.', new Tile("Path",          new Sprite(Sprites.Path, new Point(0  ,128))));
        this._tileCollection.setValue('O', new Tile("LitDgn",        new Sprite(Sprites.LitDgn, new Point(0  ,160))));
        this._tileCollection.setValue('_', new Tile("PathRock",      new Sprite(Sprites.PathRock, new Point(32 ,0  ))));
        this._tileCollection.setValue(';', new Tile("PathGrass",     new Sprite(Sprites.PathGrass, new Point(32 ,32 ))));
        this._tileCollection.setValue(' ', new Tile("WallDarkDgn",   new Sprite(Sprites.WallDarkDgn, new Point(32 ,64 ))));
        this._tileCollection.setValue(' ', new Tile("WaterGrass",    new Sprite(Sprites.WaterGrass, new Point(32 ,96 ))));
        this._tileCollection.setValue(' ', new Tile("WaterPath",     new Sprite(Sprites.WaterPath, new Point(32 ,128))));
        this._tileCollection.setValue(' ', new Tile("WallLitDgn",    new Sprite(Sprites.WallLitDgn, new Point(32 ,160))));
        this._tileCollection.setValue(' ', new Tile("50Grass50Cave", new Sprite(Sprites.Grass50Cave50, new Point(0  ,192))));
        this._tileCollection.setValue(' ', new Tile("10Grass90Cave", new Sprite(Sprites.Grass10Cave90, new Point(32 ,192))));
        this._tileCollection.setValue(' ', new Tile("50White50Cave", new Sprite(Sprites.White50Cave50, new Point(0  ,224))));
        this._tileCollection.setValue(' ', new Tile("90White10Cave", new Sprite(Sprites.White90Cave10, new Point(32 ,224))));
        this._tileCollection.setValue('=', new Tile("Crop",          new Sprite(Sprites.Crop, new Point(64 ,32 ))));
        this._tileCollection.setValue('+', new Tile("Entry",         new Sprite(Sprites.Entry, new Point(192,160))));
        this._tileCollection.setValue('#', new Tile("Building",      new Sprite(Sprites.Building, new Point(192,160))));
        this._tileCollection.setValue('!', new Tile("Sign",          new Sprite(Sprites.Sign, new Point(160,0  ))));
    }

    public Create(asciiTile:string):Tile {
        return this._tileCollection.getValue(asciiTile);
    }
}