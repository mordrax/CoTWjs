/// <reference path="references.ts"/>

enum ItemType {
    Weapon,
    Armour,
    Shield,
    Helmet,
    Bracer,
    Gauntlet,
    Belt,
    Purse,
    Bag,
    Pack,
    Chest,
    PackOfHolding
}

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

interface ISprite {
    file?:ResourceFile;
    size?:{w:number;h:number}; // optional height, should default to TILE_SIZE
    offset:{x:number;y:number};
}
interface IPoint {
    x:number;
    y:number;
}
interface ISize {
    w:number;
    h:number;
}

interface IBuilding {
    sprite:ISprite;
    entryPoint?:IPoint;
}
interface IActor {
    sprite:ISprite;
}
interface ITile {
    name:string;
    sprite:ISprite;
}

interface IItem {
    name:string;
    sprite:ISprite;
    weight: number;
    bulk: number;

    buy?: number;
    sell?: number;
}

interface IArmour extends IItem {
    ac: number;
}

interface IHelmet extends IArmour {}
interface IBracer extends IArmour {}
interface IGauntlet extends IArmour {}
interface IShield extends IArmour {}

interface IWeapon extends IItem {
    weaponClass: number;
}

interface IPurse extends IItem {}
interface IBag extends IItem {}
interface IPack extends IItem {}
interface IChest extends IItem {}
interface IPackOfHolding extends IItem {}

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
    resource: IBuilding;

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

interface ICoTWContent {
    Buildings:{
        Gate_NS:            IBuilding;
        Hut_EF:             IBuilding;
        StrawHouse_EF:      IBuilding;
        StrawHouse_WF:      IBuilding;
        BurntStrawHouse_WF: IBuilding;
        HutTemple_NF:       IBuilding;
        MineEntrance:       IBuilding;
        Fountain:           IBuilding;
        Sign:               IBuilding;
        Well:               IBuilding;
        VegePatch:          IBuilding;
        Wagon:              IBuilding;
        StairsDown:         IBuilding;
        StairsUp:           IBuilding;
        DoorClosed:         IBuilding;
        DoorOpen:           IBuilding;
    };
    Actors: {
        MaleHero:            IActor;
        FemaleHero:          IActor;
        Kobold:              IActor;
        GiantRat:            IActor;
        LargeSnake:          IActor;
        GiantAnt:            IActor;
        WildDog:             IActor;
        Skeleton:            IActor;
        GiantTrapdoorSpider: IActor;
        GiantBat:            IActor;
        CarrionCreeper:      IActor;
        GiantScorpion:       IActor;
        GreenSlime:          IActor;
        Viper:               IActor;
        Ogre:                IActor;
        WalkingCorpse:       IActor;
        HugeLizard:          IActor;
        Goblin:              IActor;
        Hobgoblin:           IActor;
        Spectre:             IActor;
        Thief:               IActor;
        Wolf:                IActor;
        DireWolf:            IActor;
        BrownBear:           IActor;
        CaveBear:            IActor;
        GelatinousGlob:      IActor;
        Troll:               IActor;
        Manticore:           IActor;
        BronzeGolem:         IActor;
        IronGolem:           IActor;
        DiamondGolem:        IActor;
        WoodenGolem:         IActor;
        Bandit:              IActor;
        Warrior:             IActor;
        Wizard:              IActor;
        Necromancer:         IActor;
        Wight:               IActor;
        Wraith:              IActor;
        Ghost:               IActor;
        Shadow:              IActor;
        Vampire:             IActor;
        IceDevil:            IActor;
        RatMan:              IActor;
        WolfMan:             IActor;
        BearMan:             IActor;
        BullMan:             IActor;
        SpikedDevil:         IActor;
        HornedDevil:         IActor;
        AbyssFiend:          IActor;
        WindElemental:       IActor;
        DustElemental:       IActor;
        FireElemental:       IActor;
        WaterElemental:      IActor;
        MagmaElemental:      IActor;
        IceElemental:        IActor;
        EarthElemental:      IActor;
        HillGiant:           IActor;
        TwoHeadGiant:        IActor;
        FrostGiant:          IActor;
        StoneGiant:          IActor;
        FireGiant:           IActor;
        Surtur:              IActor;
        FireGiantKing:       IActor;
        FrostGiantKing:      IActor;
        HillGiantKing:       IActor;
        StoneGiantKing:      IActor;
        RedDragon:           IActor;
        BlueDragon:          IActor;
        WhiteDragon:         IActor;
        GreenDragon:         IActor;
    };
    Tiles: {
        Rock:          ITile;
        Grass:         ITile;
        DarkDgn:       ITile;
        Water:         ITile;
        Path:          ITile;
        LitDgn:        ITile;
        PathRock:      ITile;
        PathGrass:     ITile;
        WallDarkDgn:   ITile;
        WaterGrass:    ITile;
        WaterPath:     ITile;
        WallLitDgn:    ITile;
        Grass50Cave50: ITile;
        Grass10Cave90: ITile;
        White50Cave50: ITile;
        White90Cave10: ITile;
        Crop:          ITile;
        Entry:         ITile;
        Building:      ITile;
        TreasurePile:  ITile;
    };
    Items: {
        Weapon : {
            BrokenSword:                  IWeapon;
            Club:                         IWeapon;
            Dagger:                       IWeapon;
            Hammer:                       IWeapon;
            HandAxe:                      IWeapon;
            Quarterstaff:                 IWeapon;
            Spear:                        IWeapon;
            ShortSword:                   IWeapon;
            Mace:                         IWeapon;
            Flail:                        IWeapon;
            Axe:                          IWeapon;
            WarHammer:                    IWeapon;
            LongSword:                    IWeapon;
            BattleAxe:                    IWeapon;
            BroadSword:                   IWeapon;
            MorningStar:                  IWeapon;
            BastardSword:                 IWeapon;
            TwoHandedSword:               IWeapon;
        };
        Armour : {
            RustyArmour:                  IArmour;
            LeatherArmour:                IArmour;
            StuddedLeatherArmour:         IArmour;
            RingMail:                     IArmour;
            ScaleMail:                    IArmour;
            ChainMail:                    IArmour;
            SplintMail:                   IArmour;
            PlateMail:                    IArmour;
            PlateArmour:                  IArmour;
            MeteoricSteelPlate:           IArmour;
            ElvenChainMail:               IArmour;
        };
        Shield : {
            BrokenShield:                 IShield;
            SmallWoodenShield:            IShield;
            MediumWoodenShield:           IShield;
            LargeWoodenShield:            IShield;
            SmallIronShield:              IShield;
            MediumIronShield:             IShield;
            LargeIronShield:              IShield;
            SmallSteelShield:             IShield;
            MediumSteelShield:            IShield;
            LargeSteelShield:             IShield;
            SmallMeteoricSteelShield:     IShield;
            MediumMeteoricSteelShield:    IShield;
            LargeMeteoricSteelShield:     IShield;
        };
        Helmet : {
            BrokenHelmet:                 IHelmet;
            LeatherHelmet:                IHelmet;
            IronHelmet:                   IHelmet;
            SteelHelmet:                  IHelmet;
            MeteoricSteelHelmet:          IHelmet;
            HelmetOfDetectMonsters:       IHelmet;
            EnchantedHelmOfStorms:        IHelmet;
        };
        Bracer : {
            Bracers:                      IBracer;
            BracersOfDefenseNormal:       IBracer;
            BracersOfDefenseS:            IBracer;
            BracersOfDefenseVS:           IBracer;
        };
        Gauntlet : {
            Gauntlet:                     IGauntlet;
            GauntletOfProtection:         IGauntlet;
            GauntletOfProtectionS:        IGauntlet;
            GauntletOfProtectionVS:       IGauntlet;
            GauntletOfSlaying:            IGauntlet;
            GauntletOfSlayingS_S:         IGauntlet;
            GauntletOfSlayingVS_VS:       IGauntlet;
            GauntletOfDexterity:          IGauntlet;
            GauntletOfDexterityS:         IGauntlet;
            GauntletOfDexterityVS:        IGauntlet;
            GauntletOfStrength:           IGauntlet;
            GauntletOfStrengthS:          IGauntlet;
            GauntletOfStrengthVS:         IGauntlet;
        };
        Belt : {
            TwoSlotBelt:                  IBelt;
            ThreeSlotBelt:                IBelt;
            FourSlotBelt:                 IBelt;
            UtilityBelt:                  IBelt;
            WandQuiverBelt:               IBelt;
        };
        Purse : {
            Purse:                        IPurse;
        };
        Bag : {
            SmallBag:                     IPack;
            MediumBag:                    IPack;
            LargeBag:                     IPack;
        };
        Pack : {
            SmallPack:                    IPack;
            MediumPack:                   IPack;
            LargePack:                    IPack;
        };
        Chest : {
            SmallChest:                   IPack;
            MediumChest:                  IPack;
            LargeChest:                   IPack;
        };
        PackOfHolding : {
            EnchantedSmallPackOfHolding:  IPack;
            EnchantedMediumPackOfHolding: IPack;
            EnchantedLargePackOfHolding:  IPack;
        };
    }
}