/// <reference path="../references.ts"/>
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
        // check if hero can move
        // move hero
        // _hero.moveUp/Down/etc
        //        update(keycode : number) {
        //            if (keycode == PhysicsEngine.UP) {
        //                this.moveUp();
        //                console.log('Move up.');
        //            }
        //            if (keycode == PhysicsEngine.LEFT) {
        //                this.moveLeft();
        //                console.log('Move left.');
        //            }
        //            if (keycode == PhysicsEngine.DOWN) {
        //                this.moveDown();
        //                console.log('Move down.');
        //            }
        //            if (keycode == PhysicsEngine.RIGHT) {
        //                this.moveRight();
        //                console.log('Move right.');
        //            }
        //        }
    };
    PhysicsEngine.LEFT = 37;
    PhysicsEngine.UP = 38;
    PhysicsEngine.RIGHT = 39;
    PhysicsEngine.DOWN = 40;
    return PhysicsEngine;
})();
//# sourceMappingURL=PhysicsEngine.js.map
