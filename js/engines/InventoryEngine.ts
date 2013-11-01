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
    _items:{[itemID:string]:Item};
}

class ActorInventory extends InventoryEngine {

}

class ShopInventory extends InventoryEngine {

}