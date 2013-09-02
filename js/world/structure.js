/// <reference path="../references.ts"/>
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

/**
* Holds all the buildings in the world, each structure should have at least
* - location for it's top right corner,
* - dimension of building
* - way to draw itself
* - entry point (if there is one) and mapping to the handler when triggered
*/
var Structure = (function () {
    function Structure(target, name, type, entryPos, startPos, endPos) {
        this._name = name;
        this._type = type;
        this._entryPos = entryPos;
        this._startPos = startPos;
        this._endPos = endPos;
        this._$el = $("<div></div>", { 'class': "structure type_" + this._type });
        this._el = this._$el.get(0);

        $(target).append(this._el);
    }
    Structure.prototype.Dimension = function () {
        var p = new Point();
        p.X = Math.abs(this._startPos.X - this._endPos.X);
        p.Y = Math.abs(this._startPos.Y - this._endPos.Y);
        return p;
    };

    Structure.prototype.Draw = function () {
        var Dim;
        Dim = this.Dimension();
        this._el.style["-webkit-transform"] = "translate3d(" + Dim.X * TILE_SIZE + 'px,' + Dim.Y * TILE_SIZE + "px,0px)";
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
})();
//# sourceMappingURL=structure.js.map
