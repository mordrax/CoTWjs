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


/**
 * Holds all the buildings in the world, each structure should have at least
 * - location for it's top right corner,
 * - dimension of building
 * - way to draw itself
 * - entry point (if there is one) and mapping to the handler when triggered
 */
class Structure implements IStructure {
    _name : string;
    _type : string;
    _entryPos : Point;
    _startPos : Point;
    _endPos : Point;
    _el : HTMLElement;
    _$el : ZeptoCollection;

    constructor (target : string, name : string, type: string, entryPos : Point, startPos : Point, endPos : Point) {
        this._name = name;
        this._type = type;
        this._entryPos = entryPos;
        this._startPos = startPos;
        this._endPos = endPos;
        this._$el = $("<div></div>", {'class': "structure type_" + this._type});
        this._el = this._$el.get(0);

        $(target).append(this._el);
    }

    Dimension(): Point {
        var p = new Point();
        p.X = Math.abs(this._startPos.X - this._endPos.X);
        p.Y = Math.abs(this._startPos.Y - this._endPos.Y);
        return p;
    }

    Draw() {
        var Dim : Point;
        Dim = this.Dimension();
        this._el.style["-webkit-transform"] = "translate3d(" + Dim.X * TILE_SIZE + 'px,' + Dim.Y * TILE_SIZE + "px,0px)";
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