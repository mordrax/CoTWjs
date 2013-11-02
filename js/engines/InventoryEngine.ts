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
    wares: {[id:string]:Item};
    constructor() {
        this.wares = {};
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
                var item = new Item(items[keys[D(keys.length-1)]]);
                this.wares[item.ID]= item;
            }
        });

    }
}