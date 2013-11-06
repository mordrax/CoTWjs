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
        _super.call(this, id, CoTWSprites.Actors.FemaleHero, coord);

        this.hp = 1000;
        this.att = 10;
        this.mana = 2;
        this.manaMax = 10;

        Game.Input.keyboardEvent.add(function (ev) {
            var direction = _this.CalculateMovement(ev.keyCode);
            if (direction.X != 0 || direction.Y != 0) {
                Game.World.MoveHero(_this.id, direction);
            }
            Game.Graphics.UpdateHeroStatus(_this.hp, _this.hpMax, _this.mana, _this.manaMax);
        });

        this.inventory.pack = new Item(Items.Chest.MediumChest, true);
        this.inventory.freeHand = new Item(Items.Bag.LargeBag, true);
        this.inventory.weapon = new Item(Items.Helmet.BrokenHelmet);
    }
    // Calculates the proposed displacement based on the keycode pressed by the user
    Player.prototype.CalculateMovement = function (keycode) {
        var movement = new Point(0, 0);

        switch (keycode) {
            case 33:
                movement.X = 1;
                movement.Y = -1;
                break;
            case 34:
                movement.X = 1;
                movement.Y = 1;
                break;
            case 35:
                movement.X = -1;
                movement.Y = 1;
                break;
            case 36:
                movement.X = -1;
                movement.Y = -1;
                break;
            case 37:
                movement.X = -1;
                break;
            case 38:
                movement.Y = -1;
                break;
            case 39:
                movement.X = 1;
                break;
            case 40:
                movement.Y = 1;
                break;
            default:
        }
        return movement;
    };
    return Player;
})(Actor);
//# sourceMappingURL=player.js.map
