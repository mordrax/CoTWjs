/// <reference path="references.ts"/>

enum ResourceType {
    buildings_2x    ,
    buildings_3x    ,
    buildings_4x    ,
    buildings_5x    ,
    SpellEffects    ,
    DifficultyLevel ,
    Monsters        ,
    Items           ,
    Spells          ,
    Tiles,
    buildings_1x
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
        Well              
}