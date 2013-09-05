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

        this.Position = new Point(10, 15);
    }
    Player.prototype.Draw = function (ctx) {
        ctx.drawImage(MONSTER_IMG, 0, 0, TILE_SIZE, TILE_SIZE, this.Position.X * TILE_SIZE, this.Position.Y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
    };
    return Player;
})(Actor);
//@ sourceMappingURL=player.js.map
