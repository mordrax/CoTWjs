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
        this.hp = this._hpMax;
        this.att = 2;
        this._def = 1;
        this._toHit = 50;

        this.inventory = {};
    }
    // pass in the target that is being attacked
    Actor.prototype.Attack = function (target) {
        var consoleMsg;
        var swing = D(100) + this._toHit;
        if (swing > 99) {
            var targetStats = target.getStats();
            var damage = (this.att - targetStats._def) * D(10);
            target.TakeDamage(damage);
            if (target.isDead()) {
                consoleMsg = this.msgKill(damage, target.id);
                Game.World.RemoveEntity(target);
            } else {
                consoleMsg = this.msgHit(damage, target.id);
            }
        } else {
            swing = swing - 50;
            consoleMsg = this.msgMiss(swing, target.id);
        }
        Log(consoleMsg);
        //console.log(this.id + ' hit the ' + target.id + ' for ' + damage + ' damage... Ouch!!!');
        //console.log(target.id + ' only has ' + targetStats._hp + ' hit points left!');
    };

    // deducts health based on the value passed in
    Actor.prototype.TakeDamage = function (damage) {
        this.hp = this.hp - damage;
    };

    Actor.prototype.getStats = function () {
        return this;
    };

    // returns true if hit points are less than or equal to 0
    Actor.prototype.isDead = function () {
        return (this.hp <= 0);
    };

    Actor.prototype.msgHit = function (damage, targetName) {
        var consoleMsg;
        if (targetName === "hero") {
            consoleMsg = this.id + ' slashes you for ' + damage + " damage... Ouch!";
            return consoleMsg;
        }

        switch (damage) {
            case 1:
                consoleMsg = 'You slip past ' + targetName + "'s guard and hit!";
                break;
            case 2:
                consoleMsg = 'You hit ' + targetName + ' in the leg!';
                break;
            case 3:
                consoleMsg = 'You hit ' + targetName + ' in the arm!';
                break;
            case 4:
                consoleMsg = 'You hit ' + targetName + ' in the chest!';
                break;
            case 5:
                consoleMsg = 'You hit ' + targetName + ' in the head!';
                break;
            case 6:
                consoleMsg = 'You deal ' + targetName + ' a solid blow!';
                break;
            case 7:
                consoleMsg = 'You deal ' + targetName + ' a crushing blow!';
                break;
            case 8:
                consoleMsg = targetName + ' reels from the fury of your attack.';
                break;
            default:
                consoleMsg = 'You hit ' + targetName + '!';
                break;
        }
        return consoleMsg;
    };

    Actor.prototype.msgKill = function (damage, targetName) {
        var consoleMsg;
        if (targetName === "hero") {
            consoleMsg = this.id + ' slashes you for ' + damage + " damage... and you're dead! GAME OVER!!!";
            return consoleMsg;
        }

        switch (damage) {
            case 6:
                consoleMsg = 'You pound ' + targetName + ' until it stops moving.';
                break;
            case 7:
                consoleMsg = 'You crush ' + targetName + "'s skull into jelly.";
                break;
            case 8:
                consoleMsg = 'You decapitate the ' + targetName + ' with a backhand stroke.';
                break;
            case 9:
                consoleMsg = 'You slash through ' + targetName + "'s throat with a neat lunge and slice.";
                break;
            case 10:
                consoleMsg = 'You crush ' + targetName + ', splintering bone and spraying gore.';
                break;
            default:
                consoleMsg = 'You hit ' + targetName + '!';
                break;
        }
        return consoleMsg;
    };

    Actor.prototype.msgMiss = function (chanceToHit, targetName) {
        var consoleMsg;
        if (targetName === "hero") {
            consoleMsg = this.id + ' swings widely as you sidestep the blow.';
            return consoleMsg;
        }
        switch (chanceToHit) {
            case 1:
                consoleMsg = targetName + " blocks your swing!";
                break;
            case 2:
                consoleMsg = targetName + ' dodges your swing!';
                break;
            case 3:
                consoleMsg = targetName + ' cowers under its shield, barely avoiding your blows!';
                break;
            case 4:
                consoleMsg = targetName + ' evades your clumsy blow!';
                break;
            case 5:
                consoleMsg = targetName + ' easily parries your strike.';
                break;
            case 6:
                consoleMsg = 'You slash at air as ' + targetName + ' dances back.';
                break;
            case 7:
                consoleMsg = 'Your blow bounces off ' + targetName + "'s armour!";
                break;
            case 8:
                consoleMsg = 'Your weapon glances off of ' + targetName + ', striking sparks.';
                break;
            case 9:
                consoleMsg = targetName + ' narrowly escapes your slashing attack.';
                break;
            case 10:
                consoleMsg = targetName + ' ignores your puny attack.';
                break;
            case 11:
                consoleMsg = targetName + ' blocks your attack!';
                break;
            case 12:
                consoleMsg = targetName + ' ignores your feeble flailings.';
                break;
            case 13:
                consoleMsg = targetName + ' laughs fiendishly at your futile attack.';
                break;
            case 14:
                consoleMsg = 'You miss ' + targetName + ' by a league!';
                break;
            case 15:
                consoleMsg = 'You stumble and miss ' + targetName + ', cleaving the air.';
                break;
            default:
                consoleMsg = 'You missed ' + targetName + '!';
                break;
        }
        return consoleMsg;
    };
    return Actor;
})(Entity);
//# sourceMappingURL=Actor.js.map
