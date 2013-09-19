/// <reference path="../references.ts"/>
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/**
* Base class for all living things in the game, hero, monsters, friendly npcs etc
*/
var Actor = (function (_super) {
    __extends(Actor, _super);
    function Actor(id, sprite, coord) {
        _super.call(this, id, EntityType.Actor, sprite, coord);
    }
    return Actor;
})(Entity);
//# sourceMappingURL=Actor.js.map
