/// <reference path="../references.ts"/>

/**
 * Manage the adding/removing/sorting/state of all items in an 'container's inventory.
 * InventoryEngine is the base type for which the following extends from
 * - Actors
 * - Shops
 * - Ground
 * - Other containers (nested containers like packs/purse)
 */
class Inventory {
    wares: Container;
    constructor() {
        this.wares = new Container();
    }
}

class ShopInventory extends Inventory {
    constructor(goodsType: ItemType[], goodsQuality: number) {
        super();

        goodsType.forEach( x => {
            // all items of type
            var items = Items[ItemType[x]];
            var keys = Object.keys(items);
            for (var i=0; i<5; i++) {
                this.wares.Add(new Item(items[keys[D(keys.length-1)]]));
            }
        });

    }
}