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

        this._x = 10;
        this._y = 15;
    }
    Player.prototype.Draw = function () {
        this._el.style["-webkit-transform"] = "translate3d(" + this._x * TILE_SIZE + 'px,' + this._y * TILE_SIZE + "px,0px) ";
    };

    Player.prototype.moveLeft = function () {
        this._x -= 1;
    };

    Player.prototype.moveRight = function () {
        this._x += 1;
    };

    Player.prototype.moveUp = function () {
        this._y -= 1;
    };

    Player.prototype.moveDown = function () {
        this._y += 1;
    };
    return Player;
})(NPC);
//@ sourceMappingURL=player.js.map
