/// <reference path="../references.ts"/>

class Monster extends Actor {
    private _loot:string;            // maximum health points

    constructor(id:string, sprite:Resource, coord:WorldCoordinates) {
        super(id, sprite, coord);

        this._loot = "copper coins";
    }

    Move(target:Point) {
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
        };

        while (possibleMoves.length > 0) {
            if (Game.World.TryMove(this.id, possibleMoves.splice(D(possibleMoves.length)-1)[0])) {
                break;
            }
        }
    }
}
