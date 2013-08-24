var PhysicsEngine = (function () {
    function PhysicsEngine(hero) {
        this._hero = hero;
    }
    PhysicsEngine.prototype.IsDown = function (keyCode) {
        return this._pressed[keyCode];
    };

    PhysicsEngine.prototype.OnKeydown = function (event) {
        this._pressed[event.keyCode] = true;
    };

    PhysicsEngine.prototype.OnKeyup = function (event) {
        this._pressed[event.keyCode] = false;
    };

    PhysicsEngine.prototype.SendEvent = function (event) {
    };
    PhysicsEngine.LEFT = 37;
    PhysicsEngine.UP = 38;
    PhysicsEngine.RIGHT = 39;
    PhysicsEngine.DOWN = 40;
    return PhysicsEngine;
})();
//@ sourceMappingURL=PhysicsEngine.js.map
