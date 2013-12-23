/// <reference path="../references.ts"/>
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Player = (function (_super) {
    __extends(Player, _super);
    function Player(id, char, coord) {
        var _this = this;
        _super.call(this, id, CoTWContent.Actors.FemaleHero.sprite, coord);

        this.attributes = char;
        this.hp = 1000;
        this.att = 10;
        this.mana = 2;
        this.manaMax = 10;

        window.addEventListener("keyup", function (event) {
            var direction = _this.CalculateMovement(event.keyCode);
            if (direction.x != 0 || direction.y != 0) {
                Game.World.MoveHero(_this.id, direction);
            }
            Game.Graphics.UpdateHeroStatus(_this.hp, _this.hpMax, _this.mana, _this.manaMax);
        });

        this.inventory.pack = new Item(CoTWContent.Items.Chest.MediumChest, true);
        this.inventory.freeHand = new Item(CoTWContent.Items.Bag.LargeBag, true);
        this.inventory.weapon = new Item(CoTWContent.Items.Helmet.BrokenHelmet);
    }
    // Calculates the proposed displacement based on the keycode pressed by the user
    Player.prototype.CalculateMovement = function (keycode) {
        var movement = new Point(0, 0);

        switch (keycode) {
            case 33:
                movement.x = 1;
                movement.y = -1;
                break;
            case 34:
                movement.x = 1;
                movement.y = 1;
                break;
            case 35:
                movement.x = -1;
                movement.y = 1;
                break;
            case 36:
                movement.x = -1;
                movement.y = -1;
                break;
            case 37:
                movement.x = -1;
                break;
            case 38:
                movement.y = -1;
                break;
            case 39:
                movement.x = 1;
                break;
            case 40:
                movement.y = 1;
                break;
            default:
        }
        return movement;
    };
    return Player;
})(Actor);
//# sourceMappingURL=player.js.map
