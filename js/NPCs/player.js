var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Player = (function (_super) {
    __extends(Player, _super);
    function Player() {
        _super.call(this);
        this._x = 10;
        this._y = 15;
    }
    Player.prototype.Draw = function () {
        alert('Player draw not implemented');
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

    Player.prototype.update = function (keycode) {
        if (keycode == Key.UP) {
            this.moveUp();
            console.log('Move up.');
        }
        if (keycode == Key.LEFT) {
            this.moveLeft();
            console.log('Move left.');
        }
        if (keycode == Key.DOWN) {
            this.moveDown();
            console.log('Move down.');
        }
        if (keycode == Key.RIGHT) {
            this.moveRight();
            console.log('Move right.');
        }
    };
    return Player;
})(NPC);
