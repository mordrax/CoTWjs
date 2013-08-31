/// <reference path="../references.ts"/>




class StructureData{
    _name : string;
    _entry_pos : Point;
    _start_pos : Point;
    _end_pos : Point;

    constructor (name : string, entry_pos : Point, start_pos : Point, end_pos : Point) {
        this._name = name;
        this._entry_pos = entry_pos;
        this._start_pos = entry_pos;
        this._end_pos = entry_pos;
    }
}

var STRUCTURE_DATA : collections.Dictionary<string, StructureData>;
STRUCTURE_DATA = new collections.Dictionary<string, StructureData>();

STRUCTURE_DATA.setValue('B1', new StructureData("Building1", new Point(0,5), new Point(0,4), new Point(0,6)));


/**
 * Holds all the buildings in the world, each structure should have at least
 * - location for it's top right corner,
 * - dimension of building
 * - way to draw itself
 * - entry point (if there is one) and mapping to the handler when triggered
 */
class Structure implements IStructure {
    name : string;
    entry_pos : Point;
    start_pos : Point;
    end_pos : Point;
    _el : HTMLElement;

    constructor (name : string, entry_pos : Point, start_pos : Point, end_pos : Point) {
        this.name = name;
        this.entry_pos = entry_pos;
        this.start_pos = start_pos;
        this.end_pos = end_pos;
    }

    Dimension(): Point {
        var p = new Point();
        p.X = Math.abs(this.start_pos.X - this.end_pos.X);
        p.Y = Math.abs(this.start_pos.Y - this.end_pos.Y);
        return p;
    }

    Draw() {
        this._el.style["-webkit-transform"] = "translate3d(" + this.start_pos.X * TILE_SIZE + 'px,' + this.start_pos.Y * TILE_SIZE + "px,0px)";
    }

    EntryPoint() {
        return this.entry_pos;
    }

    Enter() {
        throw "Not implemented exception.";
        // code called when player enters building
    }

    Position() {
        return this.start_pos;
    }
}