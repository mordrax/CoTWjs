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
        _super.call(this, id, CoTWSprites.Actors.Player, coord);

        this.hp = 1000;
        this.att = 10;

        Game.Input.keyboardEvent.add(function (ev) {
            //        WEST: 37,
            //        NORTH: 38,
            //        EAST: 39,
            //        SOUTH: 40,
            Game.World.Move(_this.id, ev.keyCode);
        });

        this.inventory.pack = new Item(Items.Container.MediumChest, true);
        this.inventory.freeHand = new Item(Items.Container.LargeBag, true);
        this.inventory.weapon = new Item(Items.Helmet.BrokenHelmet);
    }
    return Player;
})(Actor);
//# sourceMappingURL=player.js.map
