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
            //        LEFT: 37,
            //        UP: 38,
            //        RIGHT: 39,
            //        DOWN: 40,
            Game.World.Move(_this.id, ev.keyCode);
        });

        this.inventory.pack = new Container(Items.Container.MediumChest);
        this.inventory.freeHand = new Container(Items.Container.LargeBag);
        this.inventory.weapon = new Item(Items.Helmet.BrokenHelmet);
    }
    return Player;
})(Actor);
//# sourceMappingURL=player.js.map
