/// <reference path="references.ts"/>

interface Item {
    type: ItemType;
    name: string;
    weight: number;
    bulk: number;

    // not all items are buy/sellable
    buy?: number;
    sell?: number;

    sprite:Resource
}

interface Armour extends Item {
    armourType: ArmourType;
    ac: number;
}

interface Weapon extends Item {
    weaponType: WeaponType;
    weaponClass: number;
}

interface Container {
    weightCap : number;
    bulkCap : number;
}

interface Belt extends Container {
    slot : number;
    potionSlot? : number;
    scrollSlot? : number;
}

interface Resource {
    type : ResourceType;
    offset : {
        x:number;
        y:number;
    };
    size? : {
        w:number;
        h:number;
    };
    turn? : number;
}

interface IStructure {
    id : string;
    type : StructureType;
    location : WorldCoordinates;

    //shop
    goodsType?: ItemType[];
    goodsQuality?: number;
}

interface AreaToEntity {
    area : MapType;
    entities : {

    }
}



