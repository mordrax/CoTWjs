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

        this._hpMax = 50;
        this._hp = this._hpMax;
        this._att = 2;
        this._def = 1;
        this._toHit = 50;
    }
    // pass in the target that is being attacked
    Actor.prototype.Attack = function (target) {
        var consoleMsg;
        var swing = D(100) + this._toHit;
        if (swing > 99) {
            var targetStats = target.getStats();
            var damage = (this._att - targetStats._def) * D(10);
            target.TakeDamage(damage);
            if (target.isDead()) {
                consoleMsg = (this).msgKill(damage, target.id);
            } else {
                consoleMsg = (this).msgHit(damage, target.id);
            }
        } else {
            swing = swing - 50;
            consoleMsg = (this).msgMiss(swing, target.id);
        }
        Log(consoleMsg);
        //console.log(this.id + ' hit the ' + target.id + ' for ' + damage + ' damage... Ouch!!!');
        //console.log(target.id + ' only has ' + targetStats._hp + ' hit points left!');
    };

    // deducts health based on the value passed in
    Actor.prototype.TakeDamage = function (damage) {
        this._hp = this._hp - damage;
    };

    Actor.prototype.getStats = function () {
        return this;
    };

    // returns true if hit points are less than or equal to 0
    Actor.prototype.isDead = function () {
        return (this._hp <= 0);
    };
    return Actor;
})(Entity);
//# sourceMappingURL=Actor.js.map
