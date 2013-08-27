/// <reference path="../references.ts"/>

/**
 * Represents an instance of a game
 * Responsible for receiving keyboard input, handing mouse input on elements and delegating everything related to
 * the game world.
 * Basic game algorithm
 * 1. Create character
 * 2. Initialise game objects
 * 3. while events,
 *  3a. delegate to specific engines
 *  3b. track quest progression
 * 4. Last quest, end game
 */
class Game implements IDrawable {
    _physicsEngine : PhysicsEngine;
    _world : World;
    _hero : Player;

    constructor() {
        // TODO: these should really be done after character creation, while char creation isn't implemented, or for
        // testing just create these objects
        this.init();
    }
    KeyEvent(ev : KeyboardEvent ) {
//        LEFT: 37,
//        UP: 38,
//        RIGHT: 39,
//        DOWN: 40,
        if (ev.keyCode >= 37 && ev.keyCode <= 40) {
            this._physicsEngine.Move(this._hero, ev.keyCode);
        }
    }

    Start() {
        this._world.Draw();
        this.Draw();

        document.addEventListener( "keyup", (evt : KeyboardEvent) => this.KeyEvent(evt), false);
    }

    Draw() {
        this._hero.Draw();
    }

    private init() {
        this._world = new World($("#background"));
        this._hero = new Player($("#hero"));
        this._physicsEngine = new PhysicsEngine(this._hero, this._world, this.Draw);
    }

}
