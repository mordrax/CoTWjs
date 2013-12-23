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

enum RoomType {
    Rectangle,
    Throne,
    Diamond,
    Cross,
    Hexagon,
    Irregular,
    Lshape,
    Sshape,
    RectangleDonut,
    CrossDonut
}

enum CardinalDirection {
    North,
    NorthEast,
    NorthWest,
    South,
    SouthEast,
    SouthWest,
    East,
    West
}

enum MonsterType {
    MaleHero,
    FemaleHero,
    Kobold,
    GiantRat,
    LargeSnake,
    GiantAnt,
    WildDog,
    Skeleton,
    GiantTrapdoorSpider,
    GiantBat,
    CarrionCreeper,
    GiantScorpion,
    GreenSlime,
    Viper,
    Ogre,
    WalkingCorpse,
    HugeLizard,
    Goblin,
    Hobgoblin,
    Spectre,
    Thief,
    Wolf,
    DireWolf,
    BrownBear,
    CaveBear,
    GelatinousGlob,
    Troll,
    Manticore,
    BronzeGolem,
    IronGolem,
    DiamondGolem,
    WoodenGolem,
    Bandit,
    Warrior,
    Wizard,
    Necromancer,
    Wight,
    Wraith,
    Ghost,
    Shadow,
    Vampire,
    IceDevil,
    RatMan,
    WolfMan,
    BearMan,
    BullMan,
    SpikedDevil,
    HornedDevil,
    AbyssFiend,
    WindElemental,
    DustElemental,
    FireElemental,
    WaterElemental,
    MagmaElemental,
    IceElemental,
    EarthElemental,
    HillGiant,
    TwoHeadGiant,
    FrostGiant,
    StoneGiant,
    FireGiant,
    Surtur,
    FireGiantKing,
    FrostGiantKing,
    HillGiantKing,
    StoneGiantKing,
    RedDragon,
    BlueDragon,
    WhiteDragon,
    GreenDragon
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

enum TileForm {
    Solid,
    Open
}

enum ResourceFile {
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

enum StructureType {
    Door,
    Link,
    Quest,
    Sage,
    Shop,
    Shrine,
    Sign,
    NA
}