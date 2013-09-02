/// <reference path="../references.ts"/>
var PhysicsEngine = (function () {
    function PhysicsEngine(hero, world, redraw) {
        this._hero = hero;
        this._world = world;
        this._redraw = redraw;
    }
    PhysicsEngine.prototype.Move = function (actor, keycode) {
        var curPos = actor.GetPosition();
        var newPos;
        if (keycode == KeyCodes.UP) {
            newPos = new Point(curPos.X, curPos.Y - 1);
        } else if (keycode == KeyCodes.LEFT) {
            newPos = new Point(curPos.X - 1, curPos.Y);
        } else if (keycode == KeyCodes.DOWN) {
            newPos = new Point(curPos.X, curPos.Y + 1);
        } else if (keycode == KeyCodes.RIGHT) {
            newPos = new Point(curPos.X + 1, curPos.Y);
        }

        //TODO: Check collision
        // collision with monster
        // collision with building door
        // collision with map entry/exit
        var link = this._world.MapLink(newPos);
        if (link !== null) {
            actor.moveTo(link.Coord);
            this._redraw(true);
            return;
        }

        // collision with non walkable tile (solids, water, end of map)
        //this._world.GetTileInfo(newPos);
        actor.moveTo(newPos);
        this._redraw;
    };

    PhysicsEngine.prototype.SendEvent = function (event) {
        // check if hero can move
        // move hero
        // _hero.moveUp/Down/etc
        //        update(keycode : number) {
        //
        //        }
    };
    return PhysicsEngine;
})();

var KeyCodes = (function () {
    function KeyCodes() {
    }
    KeyCodes.LEFT = 37;
    KeyCodes.UP = 38;
    KeyCodes.RIGHT = 39;
    KeyCodes.DOWN = 40;
    return KeyCodes;
})();
//# sourceMappingURL=PhysicsEngine.js.map
