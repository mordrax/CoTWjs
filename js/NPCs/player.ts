/// <reference path="../references.ts"/>

class Player extends Actor {
    constructor(id:string, coord?:WorldCoordinates) {
        super(id, CoTWSprites.Actors.Player, coord);

         this.hp = 1000;
         this.att = 10;

        Game.Input.keyboardEvent.add((ev) => {
            var direction = this.CalculateMovement(ev.keyCode);
            if (direction.X != 0 || direction.Y != 0) { //check if there is any movement
                Game.World.Move(this.id, direction);
            }
        });

        this.inventory.pack = new Item(Items.Container.MediumChest, true);
        this.inventory.freeHand = new Item(Items.Container.LargeBag, true);
        this.inventory.weapon = new Item(Items.Helmet.BrokenHelmet);
    }

    // Calculates the proposed displacement based on the keycode pressed by the user
    CalculateMovement(keycode:number) {
        var movement = new Point(0,0);

        switch (keycode) {
            case 33: //NORTHEAST
                movement.X = 1;
                movement.Y = -1;
                break;
            case 34: //SOUTHEAST
                movement.X = 1;
                movement.Y = 1;
                break;
            case 35: // SOUTHWEST
                movement.X = -1;
                movement.Y = 1;
                break;
            case 36: // NORTHWEST
                movement.X = -1;
                movement.Y = -1;
                break;
            case 37: // WEST or LEFT
                movement.X = -1;
                break;
            case 38: // NORTH or UP
                movement.Y = -1;
                break;
            case 39: // EAST or RIGHT
                movement.X = 1;
                break;
            case 40: // SOUTH or DOWN
                movement.Y = 1;
                break;
            default:    // do nothing
        }
        return movement;
    }

}