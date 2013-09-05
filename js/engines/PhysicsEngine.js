var PhysicsEngine = (function () {
    function PhysicsEngine(hero, world, redraw, ctx) {
        this._hero = hero;
        this._world = world;
        this._redraw = redraw;
        this._ctx = ctx;
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

        var link = this._world.MapLink(newPos);
        if (link !== null) {
            actor.moveTo(link.Coord);
            this._redraw(this._ctx, true);
            return;
        }

        actor.moveTo(newPos);
        this._redraw(this._ctx);
    };

    PhysicsEngine.prototype.SendEvent = function (event) {
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
//@ sourceMappingURL=PhysicsEngine.js.map
