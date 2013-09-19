/// <reference path="../references.ts"/>
/**
* Represents an instance of a game.
* A game is a MVC pattern finite state machine that is event driven.
* World - Model that contains everything
* Canvas - View that uses the current hero location in the world to update the screen
* Engines - Controllers that changes the state of the world, talking to either each other via the world or manipulating entities in the world
* Events - Input and world based events that transistions the world from one state to another
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
    function Game() {
        // TODO: these should really be done after character creation, while char creation isn't implemented, or for
        // testing just create these objects
        Game.World = new World();

        Game.Input = new InputEngine();
        Game.Graphics = new GraphicsEngine();

        this._hero = new Player('hero', new WorldCoordinates(MapType.VillageMap, new Point(10, 15)));
        Game.World.AddEntity(this._hero);

        Game.World.Initialise();
    }
    Game.prototype.Start = function () {
    };
    return Game;
})();
//# sourceMappingURL=Game.js.map
