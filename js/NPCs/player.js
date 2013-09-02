/// <reference path="../references.ts"/>
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Player = (function (_super) {
    __extends(Player, _super);
    function Player($el) {
        _super.call(this);

        this._$el = $el;
        this._el = $el.get(0);

        this.Position = new Point(10, 15);
    }
    Player.prototype.Draw = function (ctx) {
        this._el.style["-webkit-transform"] = "translate3d(" + this.Position.X * TILE_SIZE + 'px,' + this.Position.Y * TILE_SIZE + "px,0px) ";
    };
    return Player;
})(Actor);
//# sourceMappingURL=player.js.map
