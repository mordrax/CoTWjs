/// <reference path="../references.ts"/>

class Player extends Actor {
    constructor(id:string, coord?:WorldCoordinates) {
        super(id, CoTWSprites.Actors.Player, coord);

         this.hp = 1000;
         this.att = 10;

        Game.Input.keyboardEvent.add((ev) => {
            //        WEST: 37,
            //        NORTH: 38,
            //        EAST: 39,
            //        SOUTH: 40,
            Game.World.Move(this.id, ev.keyCode);
        });

        this.inventory.pack = new Container(Items.Container.MediumChest);
        this.inventory.freeHand = new Container(Items.Container.LargeBag);
        this.inventory.weapon = new Item(Items.Helmet.BrokenHelmet);
    }



}