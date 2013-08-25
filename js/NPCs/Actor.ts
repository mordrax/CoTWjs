/// <reference path="../references.ts"/>

/**
 * Base class for all living things in the game, hero, monsters, friendly npcs etc
 */
class Actor {
    Position : Point;

    GetPosition() {
        return this.Position;
    }

    moveTo(position: Point) {
        this.Position = position;
    }
}

