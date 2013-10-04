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
class Game {
    public static World : World;
    public static Input : InputEngine;
    public static Graphics : GraphicsEngine;
    _hero : Player;
    _monsters : Entity[];

    constructor() {
        // TODO: these should really be done after character creation, while char creation isn't implemented, or for
        // testing just create these objects
        Game.World = new World();

        Game.Input = new InputEngine();
        Game.Graphics = new GraphicsEngine();

        this._hero = new Player('hero', new WorldCoordinates(<MapType>MapType.VillageMap, new Point(10,15)));
        Game.World.AddEntity(this._hero);

        this._monsters = [];
        for (var i=0; i < 10; i++) {
            var location = new WorldCoordinates(MapType.VillageMap,
                new Point(D(20), D(20)));
            var sak : Resource = {
                type:   Sprites.Actors.Kobold.type,
                offset: Sprites.Actors.Kobold.offset,
                size:   Sprites.Actors.Kobold.size,
                turn:   Sprites.Actors.Kobold.turn
            };
            this._monsters.push(new Monster('monster'+i, sak, location));
        }

        this._monsters.forEach(x => Game.World.AddEntity(x));

        Game.World.Initialise();
    }

    Start() {

    }

}

// returns a random number from low (i.e. 1) to the high number that is passed in.
function D(high:number, low:number=1) : number {
    return Math.floor(Math.random() * high) + low;
}
