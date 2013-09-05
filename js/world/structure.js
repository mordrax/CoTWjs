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

var s1 = new Image();
s1.src = "assets/resources/1x_buildings.png";
var s2 = new Image();
s2.src = "assets/resources/2x_buildings.png";
var s3 = new Image();
s3.src = "assets/resources/3x_buildings.png";
var s4 = new Image();
s4.src = "assets/resources/4x_buildings.png";
var s5 = new Image();
s5.src = "assets/resources/5x_buildings.png";

var STRUCTURE_DICT = new collections.Dictionary();
STRUCTURE_DICT.setValue(1, s1);
STRUCTURE_DICT.setValue(2, s2);
STRUCTURE_DICT.setValue(3, s3);
STRUCTURE_DICT.setValue(4, s4);
STRUCTURE_DICT.setValue(5, s5);

var Structure = (function () {
    function Structure(name, type, entryPos, startPos, size, offset) {
        this._name = name;
        this._type = type;
        this._entryPos = entryPos;
        this._startPos = startPos;
        this._size = size;
        this._offset = offset;
    }
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
    };

    Structure.prototype.Position = function () {
        return this._startPos;
    };
    return Structure;
})();
//@ sourceMappingURL=structure.js.map
