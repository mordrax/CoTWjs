/// <reference path="../references.ts"/>
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/**
* Manage the adding/removing/sorting/state of all items in an 'container's inventory.
* InventoryEngine is the base type for which the following extends from
* - Actors
* - Shops
* - Ground
* - Other containers (nested containers like packs/purse)
*/
var Inventory = (function () {
    function Inventory() {
        this.wares = {};
    }
    return Inventory;
})();

var ShopInventory = (function (_super) {
    __extends(ShopInventory, _super);
    function ShopInventory(goodsType, goodsQuality) {
        var _this = this;
        _super.call(this);

        goodsType.forEach(function (x) {
            // all items of type
            var items = Items[ItemType[x]];
            var keys = Object.keys(items);
            for (var i = 0; i < 5; i++) {
                var item = new Item(items[keys[D(keys.length - 1)]]);
                _this.wares[item.ID] = item;
            }
        });
    }
    return ShopInventory;
})(Inventory);
//# sourceMappingURL=InventoryEngine.js.map
