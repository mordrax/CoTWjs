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
    _items:Item[];
}

class ActorInventory extends Inventory {
    armor    : Item;
    pendant  : Item;
    cloak    : Item;
    helmet   : Item;
    shield   : Item;
    bracer   : Item;
    weapon : Item;
    leftRing : Item;
    belt     : Item;
    pack     : Item;
    gauntlet : Item;
    freeHand: Item;
    rightRing: Item;
    boot     : Item;
    purse    : Item;
}

class ShopInventory extends Inventory {
    constructor(goodsType: ItemType[], goodsQuality: number) {
        super();

        this._items = [];

        goodsType.forEach( x => {
            // all items of type
            var items = Items[ItemType[x]];
            var keys = Object.keys(items);
            for (var i=0; i<5; i++) {
                this._items.push(items[keys[D(0, keys.length-1)]]);
            }
        });

    }
}