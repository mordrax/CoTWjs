/// <reference path="../references.ts"/>
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Monster = (function (_super) {
    __extends(Monster, _super);
    function Monster(id, sprite, coord) {
        _super.call(this, id, sprite, coord);

        this._loot = "copper coins";
    }
    return Monster;
})(Actor);
//# sourceMappingURL=monsters.js.map
