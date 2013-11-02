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
    Monster.prototype.Move = function (target) {
        //do some funky algorithm to get a point
        var diff = target.Difference(this.location.position);
        var dir = new Point(0, 0);

        if (diff.X !== 0) {
            dir.X = diff.X / Math.abs(diff.X);
        }
        if (diff.Y !== 0) {
            dir.Y = diff.Y / Math.abs(diff.Y);
        }

        var possibleMoves = [dir, new Point(dir.X, 0), new Point(0, dir.Y)];
        for (var i = 0; i < possibleMoves.length; i++) {
            if (possibleMoves[i].Equals(new Point(0, 0)))
                continue;

            if (Game.World.TryMove(this.id, possibleMoves[i])) {
                break;
            }
        }
    };
    return Monster;
})(Actor);
//# sourceMappingURL=monsters.js.map
