/// <reference path="../references.ts"/>
/**
* Represents an instance of a game
* Responsible for receiving keyboard input, handing mouse input on elements and delegating everything related to
* the game world.
* Basic game algorithm
* 1. Create character
* 2. Initialise game objects
* 3. while events,
*  3a. delegate to specific engines
*  3b. track quest progression
* 4. Last quest, end game
*/
var Game = (function () {
    function Game() {
        // TODO: these should really be done after character creation, while char creation isn't implemented, or for
        // testing just create these objects
        this.init();
    }
    Game.prototype.KeyEvent = function (ev) {
        if (ev.keyCode >= 37 && ev.keyCode <= 40) {
            this._physicsEngine.Move(this._hero, ev.keyCode);
        }
    };

    Game.prototype.Start = function () {
        var _this = this;
        this.Draw(this._ctx, true);

        document.addEventListener("keyup", function (evt) {
            return _this.KeyEvent(evt);
        }, false);
    };

    Game.prototype.Draw = function (ctx, drawWorld) {
        if (drawWorld) {
            this._world.Draw(this._ctx);
        }
        this._hero.Draw(this._ctx);
    };

    Game.prototype.init = function () {
        this._world = new World($("#background"));
        this._hero = new Player($("#hero"));
        this._physicsEngine = new PhysicsEngine(this._hero, this._world, this.Draw);
        this._ctx = $('#world')[0].getContext("2d");
    };
    return Game;
})();
//# sourceMappingURL=Game.js.map
