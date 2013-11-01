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
var InventoryEngine = (function () {
    function InventoryEngine() {
    }
    return InventoryEngine;
})();

var ActorInventory = (function (_super) {
    __extends(ActorInventory, _super);
    function ActorInventory() {
        _super.apply(this, arguments);
    }
    return ActorInventory;
})(InventoryEngine);

var ShopInventory = (function (_super) {
    __extends(ShopInventory, _super);
    function ShopInventory() {
        _super.apply(this, arguments);
    }
    return ShopInventory;
})(InventoryEngine);
//# sourceMappingURL=InventoryEngine.js.map
