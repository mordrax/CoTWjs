/// <reference path="../references.ts"/>
/**
* Represents an instance of a game.
* A game is a MVC pattern finite state machine that is event driven.
* World - Model that contains everything
* Canvas - View that uses the current hero location in the world to update the screen
* Engines - Controllers that changes the state of the world, talking to either each other via the world or manipulating entities in the world
* Events - Input and world based events that transitions the world from one state to another
*
*
* 1. Create character
* 2. Initialise game objects
* 3. while events,
*  3a. delegate to specific engines
*  3b. track quest progression
* 4. Last quest, end game
*/
var Game = (function () {
    function Game(char) {
        // TODO: these should really be done after character creation, while char creation isn't implemented, or for
        // testing just create these objects
        Game.World = new World();
        Game.Graphics = new GraphicsEngine();

        Game.Hero = new Player('hero', char, new WorldCoordinates(GameArea.Village, new Point(11, 17)));
        Game.World.AddEntity(Game.Hero);

        this._monsters = [];
        for (var i = 0; i < 10; i++) {
            var location = new WorldCoordinates(GameArea.Farm, new Point(D(40), D(30)));
            this._monsters.push(new Monster(MonsterType.Kobold, CoTWContent.Actors.Kobold.sprite, location));
        }

        this._monsters.forEach(function (x) {
            return Game.World.AddEntity(x);
        });
    }
    Game.prototype.Start = function () {
        Game.World.Draw();
        $(".window").hide();
        $("#main-game-window").show();
        $('#in-game-window').show();
    };
    return Game;
})();

// returns a random number from low (i.e. 1) to the high number that is passed in.
function D(high, low) {
    if (typeof low === "undefined") { low = 1; }
    return Math.floor(Math.random() * high) + low;
}

function Log(msg, msgtype) {
    if (typeof msgtype === "undefined") { msgtype = MessageType.Normal; }
    $('#messages').prepend(Format("<div class='{0}'>{1}</div>", msgtype, msg));
}

//http://stackoverflow.com/questions/4656843/jquery-get-querystring-from-url
function getUrlVars(key) {
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for (var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    if (!!key) {
        return vars[key];
    } else {
        return vars;
    }
}

function Format(str) {
    var argument = [];
    for (var _i = 0; _i < (arguments.length - 1); _i++) {
        argument[_i] = arguments[_i + 1];
    }
    var args = argument;
    return str.replace(/{(\d+)}/g, function (match, number) {
        return typeof args[number] != 'undefined' ? args[number] : match;
    });
}
//# sourceMappingURL=Game.js.map
