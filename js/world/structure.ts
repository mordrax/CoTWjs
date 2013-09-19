/// <reference path="../references.ts"/>

// All structure types - changed to string to test something out, so not much point to this being enum now right?
enum StructureType{
    "Sign",
    "VegePatch",
    "Cart",
    "Well",
    "NS_Gate",
    "EF_Hut",
    "EF_BurntHut",
    "NF_Building",
    "SF_BuildingYard",
    "SF_Building",
    "EF_StrawHouse",
    "EF_BurntStrawHouse",
    "WF_StrawHouse",
    "WF_BurntStrawHouse",
    "EF_Building",
    "EF_JunkYard",
    "WF_Bank",
    "NE_BigHouseGarden",
    "NE_BigHouse",
    "NF_HutTemple",
    "NF_BurntTemple",
    "EW_HouseGroup",
    "NF_BrickTemple"
}

//TODO: fix static structure images
//var s1 = new HTMLImageElement();
//s1.src = "assets/resources/1x_buildings.png";
//var s2 = new HTMLImageElement();
//s2.src = "assets/resources/2x_buildings.png";
//var s3 = new HTMLImageElement();
//s3.src = "assets/resources/3x_buildings.png";
//var s4 = new HTMLImageElement();
//s4.src = "assets/resources/4x_buildings.png";
//var s5 = new HTMLImageElement();
//s5.src = "assets/resources/5x_buildings.png";

var STRUCTURE_DICT = new collections.Dictionary<number, HTMLImageElement >();
//STRUCTURE_DICT.setValue(1, s1);
//STRUCTURE_DICT.setValue(2, s2);
//STRUCTURE_DICT.setValue(3, s3);
//STRUCTURE_DICT.setValue(4, s4);
//STRUCTURE_DICT.setValue(5, s5);
/**
 * Holds all the buildings in the world, each structure should have at least
 * - location for it's top right corner,
 * - dimension of building
 * - way to draw itself
 * - entry point (if there is one) and mapping to the handler when triggered
 */
class Structure extends Entity {
    _name : string;
    _type : string;
    _entryPos : Point;
    _startPos : Point;
    _size : Point;
    _offset :Point;
/*                               TODO: fix structures

    constructor (name : string, type: string, entryPos : Point, startPos : Point, size : Point, offset : Point) {
        this._name = name;
        this._type = type;
        this._entryPos = entryPos;
        this._startPos = startPos;
        this._size = size;
        this._offset = offset;
    }
*/

    Draw(ctx : CanvasRenderingContext2D) {
        var pX = this._size.X*TILE_SIZE;
        var pY = this._size.Y*TILE_SIZE;
        ctx.drawImage(
            STRUCTURE_DICT.getValue(this._size.Y),
            this._offset.X*TILE_SIZE, this._offset.Y*TILE_SIZE, pX, pY,
            this._startPos.X*TILE_SIZE, this._startPos.Y*TILE_SIZE, pX, pY);
    }

    EntryPoint() {
        return this._entryPos;
    }

    Enter() {
        throw "Not implemented exception.";
        // code called when player enters building
    }

    Position() {
        return this._startPos;
    }
}