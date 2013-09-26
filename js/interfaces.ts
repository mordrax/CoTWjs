/// <reference path="references.ts"/>

interface Resource {
    type : ResourceType;
    offset : {
        x:number;
        y:number;
    };
    size : {
        w:number;
        h:number;
    };
    turn : number;
}

interface IStructure {
    id : string;
    type : StructureType;
    location : WorldCoordinates;
}

interface Sprite {
    Actors : {
        Player : Resource;
        Kobold : Resource;
    };
    Tiles : {
        Rock          : Resource;
        Grass         : Resource;
        DarkDgn       : Resource;
        Water         : Resource;
        Path          : Resource;
        LitDgn        : Resource;
        PathRock      : Resource;
        PathGrass     : Resource;
        WallDarkDgn   : Resource;
        WaterGrass    : Resource;
        WaterPath     : Resource;
        WallLitDgn    : Resource;
        Grass50Cave50 : Resource;
        Grass10Cave90 : Resource;
        White50Cave50 : Resource;
        White90Cave10 : Resource;
        Crop          : Resource;
        Entry         : Resource;
        Building      : Resource;
        Sign          : Resource;
    };
    Buildings : {
        Gate_NS       : Resource;
        StrawHouse_EF : Resource;
        StrawHouse_WF : Resource;
        Hut_EF        : Resource;
        HutTemple_NF  : Resource;
    }
}

var Sprites:Sprite = {
    Actors: {
        Player: {type: ResourceType.Monsters, offset: {x: 0, y: 0}, size: {w: TILE_SIZE, h: TILE_SIZE}, turn:0},
        Kobold: {type: ResourceType.Monsters, offset: {x: 64, y: 0}, size: {w: TILE_SIZE, h: TILE_SIZE}, turn:0}
    },
    Tiles: {
        Rock:          {type: ResourceType.Tiles, offset: {x: 0  , y: 0  }, size: {w: TILE_SIZE, h: TILE_SIZE}, turn:0},
        Grass:         {type: ResourceType.Tiles, offset: {x: 0  , y: 32 }, size: {w: TILE_SIZE, h: TILE_SIZE}, turn:0},
        DarkDgn:       {type: ResourceType.Tiles, offset: {x: 0  , y: 64 }, size: {w: TILE_SIZE, h: TILE_SIZE}, turn:0},
        Water:         {type: ResourceType.Tiles, offset: {x: 0  , y: 96 }, size: {w: TILE_SIZE, h: TILE_SIZE}, turn:0},
        Path:          {type: ResourceType.Tiles, offset: {x: 0  , y: 128}, size: {w: TILE_SIZE, h: TILE_SIZE}, turn:0},
        LitDgn:        {type: ResourceType.Tiles, offset: {x: 0  , y: 160}, size: {w: TILE_SIZE, h: TILE_SIZE}, turn:0},
        PathRock:      {type: ResourceType.Tiles, offset: {x: 32 , y: 0  }, size: {w: TILE_SIZE, h: TILE_SIZE}, turn:0},
        PathGrass:     {type: ResourceType.Tiles, offset: {x: 32 , y: 32 }, size: {w: TILE_SIZE, h: TILE_SIZE}, turn:0},
        WallDarkDgn:   {type: ResourceType.Tiles, offset: {x: 32 , y: 64 }, size: {w: TILE_SIZE, h: TILE_SIZE}, turn:0},
        WaterGrass:    {type: ResourceType.Tiles, offset: {x: 32 , y: 96 }, size: {w: TILE_SIZE, h: TILE_SIZE}, turn:0},
        WaterPath:     {type: ResourceType.Tiles, offset: {x: 32 , y: 128}, size: {w: TILE_SIZE, h: TILE_SIZE}, turn:0},
        WallLitDgn:    {type: ResourceType.Tiles, offset: {x: 32 , y: 160}, size: {w: TILE_SIZE, h: TILE_SIZE}, turn:0},
        Grass50Cave50: {type: ResourceType.Tiles, offset: {x: 0  , y: 192}, size: {w: TILE_SIZE, h: TILE_SIZE}, turn:0},
        Grass10Cave90: {type: ResourceType.Tiles, offset: {x: 32 , y: 192}, size: {w: TILE_SIZE, h: TILE_SIZE}, turn:0},
        White50Cave50: {type: ResourceType.Tiles, offset: {x: 0  , y: 224}, size: {w: TILE_SIZE, h: TILE_SIZE}, turn:0},
        White90Cave10: {type: ResourceType.Tiles, offset: {x: 32 , y: 224}, size: {w: TILE_SIZE, h: TILE_SIZE}, turn:0},
        Crop:          {type: ResourceType.Tiles, offset: {x: 64 , y: 32 }, size: {w: TILE_SIZE, h: TILE_SIZE}, turn:0},
        Entry:         {type: ResourceType.Tiles, offset: {x: 192, y: 160}, size: {w: TILE_SIZE, h: TILE_SIZE}, turn:0},
        Building:      {type: ResourceType.Tiles, offset: {x: 192, y: 160}, size: {w: TILE_SIZE, h: TILE_SIZE}, turn:0},
        Sign:          {type: ResourceType.Tiles, offset: {x: 160, y: 0  }, size: {w: TILE_SIZE, h: TILE_SIZE}, turn:0}
    },
    Buildings: {
        Gate_NS      : {type:ResourceType.buildings_1x, offset: {x:0,  y:0}, size:{w:96, h:32},  turn:0},
        StrawHouse_EF: {type:ResourceType.buildings_3x, offset: {x:0,  y:0}, size:{w:96, h:96},  turn:0},
        StrawHouse_WF: {type:ResourceType.buildings_3x, offset: {x:192,y:0}, size:{w:96, h:96},  turn:0},
        Hut_EF       : {type:ResourceType.buildings_2x, offset: {x:0,  y:0}, size:{w:64, h:64},  turn:0},
        HutTemple_NF : {type:ResourceType.buildings_5x, offset: {x:0,  y:0}, size:{w:160,h:160}, turn:0}
    }
}