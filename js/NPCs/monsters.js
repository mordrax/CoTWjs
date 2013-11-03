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

        var possibleMoves = [];
        if (dir.X == 0) {
            possibleMoves = [new Point(1, dir.Y), new Point(-1, dir.Y)];
        }
        if (dir.Y == 0) {
            possibleMoves = [new Point(dir.X, 1), new Point(dir.X, -1)];
        }
        if (dir.X != 0 && dir.Y != 0) {
            possibleMoves = [new Point(dir.X, 0), new Point(0, dir.Y)];
        }

        if (Game.World.TryMove(this.id, dir)) {
            return;
        }
        ;

        while (possibleMoves.length > 0) {
            if (Game.World.TryMove(this.id, possibleMoves.splice(D(possibleMoves.length) - 1)[0])) {
                break;
            }
        }
    };
    return Monster;
})(Actor);
//# sourceMappingURL=monsters.js.map
