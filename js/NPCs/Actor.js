/// <reference path="../references.ts"/>
/**
* Base class for all living things in the game, hero, monsters, friendly npcs etc
*/
var Actor = (function () {
    function Actor() {
    }
    Actor.prototype.GetPosition = function () {
        return this.Position;
    };

    Actor.prototype.moveTo = function (position) {
        this.Position = position;
    };
    return Actor;
})();
//# sourceMappingURL=Actor.js.map
