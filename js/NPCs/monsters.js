/// <reference path="../references.ts"/>
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Monster = (function (_super) {
    __extends(Monster, _super);
    function Monster(type, sprite, coord) {
        _super.call(this, MonsterType[type], sprite, coord);

        this.monsterType = type;
        this._loot = "copper coins";
    }
    Monster.prototype.Move = function (target) {
        //do some funky algorithm to get a point
        var diff = target.Difference(this.location.position);
        var dir = new Point(0, 0);

        if (diff.x !== 0) {
            dir.x = diff.x / Math.abs(diff.x);
        }
        if (diff.y !== 0) {
            dir.y = diff.y / Math.abs(diff.y);
        }

        var possibleMoves = [];
        if (dir.x == 0) {
            possibleMoves = [new Point(1, dir.y), new Point(-1, dir.y)];
        }
        if (dir.y == 0) {
            possibleMoves = [new Point(dir.x, 1), new Point(dir.x, -1)];
        }
        if (dir.x != 0 && dir.y != 0) {
            possibleMoves = [new Point(dir.x, 0), new Point(0, dir.y)];
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
