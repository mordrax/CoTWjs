/// <reference path="../references.ts"/>
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Player = (function (_super) {
    __extends(Player, _super);
    function Player(id, coord) {
        var _this = this;
        _super.call(this, id, Sprites.Actors.Player, coord);

        // this._hp = 100;
        // this._att = 10;
        Game.Input.keyboardEvent.add(function (ev) {
            //        LEFT: 37,
            //        UP: 38,
            //        RIGHT: 39,
            //        DOWN: 40,
            Game.World.Move(_this.id, ev.keyCode);
        });
    }
    Player.prototype.msgHit = function (variance, name) {
        var consoleMsg;
        switch (variance) {
            case 1:
                consoleMsg = 'You slip past ' + name + "'s guard and hit!";
                break;
            case 2:
                consoleMsg = 'You hit ' + name + ' in the leg!';
                break;
            case 3:
                consoleMsg = 'You hit ' + name + ' in the arm!';
                break;
            case 4:
                consoleMsg = 'You hit ' + name + ' in the chest!';
                break;
            case 5:
                consoleMsg = 'You hit ' + name + ' in the head!';
                break;
            case 6:
                consoleMsg = 'You deal ' + name + ' a solid blow!';
                break;
            case 7:
                consoleMsg = 'You deal ' + name + ' a crushing blow!';
                break;
            case 8:
                consoleMsg = name + ' reels from the fury of your attack.';
                break;
            default:
                consoleMsg = 'You hit ' + name + '!';
                break;
        }
        return consoleMsg;
    };

    Player.prototype.msgKill = function (variance, name) {
        var consoleMsg;
        switch (variance) {
            case 6:
                consoleMsg = 'You pound ' + name + ' until it stops moving.';
                break;
            case 7:
                consoleMsg = 'You crush ' + name + "'s skull into jelly.";
                break;
            case 8:
                consoleMsg = 'You decapitate the ' + name + ' with a backhand stroke.';
                break;
            case 9:
                consoleMsg = 'You slash through ' + name + "'s throat with a neat lunge and slice.";
                break;
            case 10:
                consoleMsg = 'You crush ' + name + ', splintering bone and spraying gore.';
                break;
            default:
                consoleMsg = 'You hit ' + name + '!';
                break;
        }
        return consoleMsg;
    };

    Player.prototype.msgMiss = function (variance, name) {
        var consoleMsg;
        switch (variance) {
            case 1:
                consoleMsg = name + " blocks your swing!";
                break;
            case 2:
                consoleMsg = name + ' dodges your swing!';
                break;
            case 3:
                consoleMsg = name + ' cowers under its shield, barely avoiding your blows!';
                break;
            case 4:
                consoleMsg = name + ' evades your clumsy blow!';
                break;
            case 5:
                consoleMsg = name + ' easily parries your strike.';
                break;
            case 6:
                consoleMsg = 'You slash at air as ' + name + ' dances back.';
                break;
            case 7:
                consoleMsg = 'Your blow bounces off ' + name + "'s armour!";
                break;
            case 8:
                consoleMsg = 'Your weapon glances off of ' + name + ', striking sparks.';
                break;
            case 9:
                consoleMsg = name + ' narrowly escapes your slashing attack.';
                break;
            case 10:
                consoleMsg = name + ' ignores your puny attack.';
                break;
            case 11:
                consoleMsg = name + ' blocks your attack!';
                break;
            case 12:
                consoleMsg = name + ' ignores your feeble flailings.';
                break;
            case 13:
                consoleMsg = name + ' laughs fiendishly at your futile attack.';
                break;
            case 14:
                consoleMsg = 'You miss ' + name + ' by a league!';
                break;
            case 15:
                consoleMsg = 'You stumble and miss ' + name + ', cleaving the air.';
                break;
            default:
                consoleMsg = 'You missed ' + name + '!';
                break;
        }
        return consoleMsg;
    };
    return Player;
})(Actor);
//# sourceMappingURL=player.js.map
