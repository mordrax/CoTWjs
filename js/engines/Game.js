var Game = (function () {
    function Game() {
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
        this._hero = new Player();
        this._physicsEngine = new PhysicsEngine(this._hero, this._world, this.Draw, this._ctx);
        this._ctx = $('#world')[0].getContext("2d");
    };
    return Game;
})();
//@ sourceMappingURL=Game.js.map
