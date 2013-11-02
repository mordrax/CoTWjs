/// <reference path="../references.ts"/>

class Monster extends Actor {
    private _loot: string;            // maximum health points

    constructor(id:string, sprite:Resource, coord:WorldCoordinates) {
        super(id, sprite, coord);

        this._loot = "copper coins";
    }

    Move(target:Point) {
        //do some funky algorithm to get a point
        var diff = target.Difference(this.location.position);
        var dir = new Point(0,0);

        if (diff.X !== 0){
            dir.X = diff.X/Math.abs(diff.X);
        }
        if (diff.Y !== 0){
            dir.Y = diff.Y/Math.abs(diff.Y);
        }

        var possibleMoves = [dir, new Point(dir.X, 0), new Point(0, dir.Y)];
        for (var i =0; i < possibleMoves.length; i++) {
            if (possibleMoves[i].Equals(new Point(0, 0))) continue;

            if (Game.World.TryMove(this.id, possibleMoves[i])) {
                break;
            }
        }
    }
}
