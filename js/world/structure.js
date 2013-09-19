/// <reference path="../references.ts"/>
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
// All structure types - changed to string to test something out, so not much point to this being enum now right?
var StructureType;
(function (StructureType) {
    StructureType[StructureType["Sign"] = 0] = "Sign";
    StructureType[StructureType["VegePatch"] = 1] = "VegePatch";
    StructureType[StructureType["Cart"] = 2] = "Cart";
    StructureType[StructureType["Well"] = 3] = "Well";
    StructureType[StructureType["NS_Gate"] = 4] = "NS_Gate";
    StructureType[StructureType["EF_Hut"] = 5] = "EF_Hut";
    StructureType[StructureType["EF_BurntHut"] = 6] = "EF_BurntHut";
    StructureType[StructureType["NF_Building"] = 7] = "NF_Building";
    StructureType[StructureType["SF_BuildingYard"] = 8] = "SF_BuildingYard";
    StructureType[StructureType["SF_Building"] = 9] = "SF_Building";
    StructureType[StructureType["EF_StrawHouse"] = 10] = "EF_StrawHouse";
    StructureType[StructureType["EF_BurntStrawHouse"] = 11] = "EF_BurntStrawHouse";
    StructureType[StructureType["WF_StrawHouse"] = 12] = "WF_StrawHouse";
    StructureType[StructureType["WF_BurntStrawHouse"] = 13] = "WF_BurntStrawHouse";
    StructureType[StructureType["EF_Building"] = 14] = "EF_Building";
    StructureType[StructureType["EF_JunkYard"] = 15] = "EF_JunkYard";
    StructureType[StructureType["WF_Bank"] = 16] = "WF_Bank";
    StructureType[StructureType["NE_BigHouseGarden"] = 17] = "NE_BigHouseGarden";
    StructureType[StructureType["NE_BigHouse"] = 18] = "NE_BigHouse";
    StructureType[StructureType["NF_HutTemple"] = 19] = "NF_HutTemple";
    StructureType[StructureType["NF_BurntTemple"] = 20] = "NF_BurntTemple";
    StructureType[StructureType["EW_HouseGroup"] = 21] = "EW_HouseGroup";
    StructureType[StructureType["NF_BrickTemple"] = 22] = "NF_BrickTemple";
})(StructureType || (StructureType = {}));

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
var STRUCTURE_DICT = new collections.Dictionary();

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
var Structure = (function (_super) {
    __extends(Structure, _super);
    function Structure() {
        _super.apply(this, arguments);
    }
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
    Structure.prototype.Draw = function (ctx) {
        var pX = this._size.X * TILE_SIZE;
        var pY = this._size.Y * TILE_SIZE;
        ctx.drawImage(STRUCTURE_DICT.getValue(this._size.Y), this._offset.X * TILE_SIZE, this._offset.Y * TILE_SIZE, pX, pY, this._startPos.X * TILE_SIZE, this._startPos.Y * TILE_SIZE, pX, pY);
    };

    Structure.prototype.EntryPoint = function () {
        return this._entryPos;
    };

    Structure.prototype.Enter = function () {
        throw "Not implemented exception.";
        // code called when player enters building
    };

    Structure.prototype.Position = function () {
        return this._startPos;
    };
    return Structure;
})(Entity);
//# sourceMappingURL=structure.js.map
