/// <reference path="references.ts"/>

interface IEquipment {
    armor?    : Item;
    pendant?  : Item;
    cloak?    : Item;
    helmet?   : Item;
    shield?   : Item;
    bracer?   : Item;
    weapon?   : Item;
    leftRing? : Item;
    belt?     : Item;
    pack?     : Item;
    gauntlet? : Item;
    freeHand? : Item;
    rightRing?: Item;
    boot?     : Item;
    purse?    : Item;
}

interface IItem {
    type: ItemType;
    name: string;
    weight: number;
    bulk: number;

    // not all items are buy/sellable
    buy?: number;
    sell?: number;

    sprite:Resource
}

interface IArmour extends IItem {
    armourType: ArmourType;
    ac: number;
}

interface IWeapon extends IItem {
    weaponType: WeaponType;
    weaponClass: number;
}

interface IContainer {
    weightCap : number;
    bulkCap : number;
}

interface IBelt extends IContainer {
    slot : number;
    potionSlot? : number;
    scrollSlot? : number;
}

interface Resource {
    type : ResourceFile;
    offset : {
        x:number;
        y:number;
    };
    size? : {
        w:number;
        h:number;
    };
}

interface IStructure {
    id : string;
    type : StructureType;
    location : WorldCoordinates;
    resource: BuildingResource;

    //shop
    goodsType?: ItemType[];
    goodsQuality?: number;
}

interface IEntity {
    [mapType:string] : {[id:string]:Entity}
}

interface IArea {
    [mapType:string] : Tile[][]
}

interface IMapLink {
    LinkA: WorldCoordinates;
    LinkB: WorldCoordinates;
}

