/// <reference path="references.ts"/>

enum MessageType {
    Normal,

    /* Attack messages: Perspective of the hero */
    Hit,
    Miss,
    Kill,
    Dodged,
    GotHit,
    Killed

}

enum WeaponType {
    BrokenSword,
    Club,
    Dagger,
    Hammer,
    HandAxe,
    Quarterstaff,
    Spear,
    ShortSword,
    Mace,
    Flail,
    Axe,
    WarHammer,
    LongSword,
    BattleAxe,
    BroadSword,
    Morningstar,
    BastardSword,
    TwoHandedSword,
}

enum ArmourType {
    BrokenArmour,
    LeatherArmour,
    StuddedLeatherArmour,
    RingMail,
    ScaleMail,
    ChainMail,
    SplintMail,
    PlateMail,
    Platearmour,
    MeteoricSteelPlate,
    ElvenChainMail
}

enum ShieldType {
    BrokenShield,
    SmallWoodenShield,
    MediumWoodenShield,
    SmallIronShield,
    LargeWoodenShield,
    MediumIronShield,
    SmallSteelShield,
    LargeIronShield,
    MediumSteelShield,
    LargeSteelShield,
    SmallMeteoricSteelShield,
    MediumMeteoricSteelShield,
    LargeMeteoricSteelShield
}

enum HelmetType {
    BrokenHelmet,
    LeatherHelmet,
    IronHelmet,
    SteelHelmet,
    MeteoricSteelHelmet,
    HelmetofDetectMonsters,
    EnchantedHelmofStorms
}

enum BracerType {
    Plain,
    Defense,
}

enum GauntletType {
    Plain,
    Protection,
    Slaying,
    Dexterity,
    Strength,
}

enum ScreenType {
    Main,
    Shop
}

enum ResourceType {
    buildings_1x    ,
    buildings_2x    ,
    buildings_3x    ,
    buildings_4x    ,
    buildings_5x    ,
    SpellEffects    ,
    DifficultyLevel ,
    Monsters        ,
    Items           ,
    Spells          ,
    Tiles
}

enum EntityType {
    Actor,
    Building,
    Tile
}

// All structure types - changed to string to test something out, so not much point to this being enum now right?
enum StructureType{
        Bank_WF           ,
        BigHouse_NE       ,
        BigHouseGarden_NE ,
        BrickTemple_NF    ,
        Building_EF       ,
        Building_NF       ,
        Building_SF       ,
        BuildingYard_SF   ,
        BurntHut_EF       ,
        BurntStrawHouse_EF,
        BurntStrawHouse_WF,
        BurntTemple_NF    ,
        Cart              ,
        Gate_NS           ,
        HouseGroup_EW     ,
        Hut_EF            ,
        HutTemple_NF      ,
        JunkYard_EF       ,
        Sign              ,
        StrawHouse_EF     ,
        StrawHouse_WF     ,
        VegePatch         ,
        Well              ,
        MineEntrance
}