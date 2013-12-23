/// <reference path="../references.ts"/>

class Player extends Actor {
    attributes:ICharCreation;
    public manaMax:number;            // maximum mana points
    public mana:number;               // current mana points

    constructor(id:string, char:ICharCreation, coord?:WorldCoordinates) {
        super(id, CoTWContent.Actors.FemaleHero.sprite, coord);

        this.attributes = char;
        this.hp = 1000;
        this.att = 10;
        this.mana = 2;
        this.manaMax = 10;

        window.addEventListener("keyup", (event : KeyboardEvent) => {
            var direction = this.CalculateMovement(event.keyCode);
            if (direction.x != 0 || direction.y != 0) { //check if there is any movement
                Game.World.MoveHero(this.id, direction);
            }
            Game.Graphics.UpdateHeroStatus(this.hp, this.hpMax, this.mana, this.manaMax);
        });

        this.inventory.pack = new Item(CoTWContent.Items.Chest.MediumChest, true);
        this.inventory.freeHand = new Item(CoTWContent.Items.Bag.LargeBag, true);
        this.inventory.weapon = new Item(CoTWContent.Items.Helmet.BrokenHelmet);
    }

    // Calculates the proposed displacement based on the keycode pressed by the user
    CalculateMovement(keycode:number) {
        var movement = new Point(0,0);

        switch (keycode) {
            case 33: //NORTHEAST
                movement.x = 1;
                movement.y = -1;
                break;
            case 34: //SOUTHEAST
                movement.x = 1;
                movement.y = 1;
                break;
            case 35: // SOUTHWEST
                movement.x = -1;
                movement.y = 1;
                break;
            case 36: // NORTHWEST
                movement.x = -1;
                movement.y = -1;
                break;
            case 37: // WEST or LEFT
                movement.x = -1;
                break;
            case 38: // NORTH or UP
                movement.y = -1;
                break;
            case 39: // EAST or RIGHT
                movement.x = 1;
                break;
            case 40: // SOUTH or DOWN
                movement.y = 1;
                break;
            default:    // do nothing
        }
        return movement;
    }

}