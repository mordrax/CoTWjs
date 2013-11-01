/// <reference path="../references.ts"/>

/**
 * Manage the adding/removing/sorting/state of all items in an 'container's inventory.
 * InventoryEngine is the base type for which the following extends from
 * - Actors
 * - Shops
 * - Ground
 * - Other containers (nested containers like packs/purse)
 */
class InventoryEngine {
    _items:Item[];
}

class ActorInventory extends InventoryEngine {

}

class ShopInventory extends InventoryEngine {
    constructor(goodsType: ItemType[], goodsQuality: number) {
        super();

        this._items = [];

        goodsType.forEach( x => {
            for (var i=0; i<5; i++) {
                this._items.push(Items[ItemType[x]]);
            }
        });

    }
}