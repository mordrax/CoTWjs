/// <reference path="references.ts"/>

interface IResource {
    type : ResourceType;
    offset : {
        x:number;
        y:number;
    };
    size : {
        w:number;
        h:number;
    }

}

interface IStructure {
    id : string;
    type : StructureType;
    location : WorldCoordinates;
}

interface ISprite {
    Actors : {
        Player : IResource;
    };
    Tiles : {
        Rock          : IResource;
        Grass         : IResource;
        DarkDgn       : IResource;
        Water         : IResource;
        Path          : IResource;
        LitDgn        : IResource;
        PathRock      : IResource;
        PathGrass     : IResource;
        WallDarkDgn   : IResource;
        WaterGrass    : IResource;
        WaterPath     : IResource;
        WallLitDgn    : IResource;
        Grass50Cave50 : IResource;
        Grass10Cave90 : IResource;
        White50Cave50 : IResource;
        White90Cave10 : IResource;
        Crop          : IResource;
        Entry         : IResource;
        Building      : IResource;
        Sign          : IResource;
    };
    Buildings : {
        Gate_NS       : IResource;
        StrawHouse_EF : IResource;
        StrawHouse_WF : IResource;
        Hut_EF        : IResource;
        HutTemple_NF  : IResource;
    }
}

var Sprites:ISprite = {
    Actors: {
        Player: {type: ResourceType.Monsters, offset: {x: 0, y: 0}, size: {w: TILE_SIZE, h: TILE_SIZE}}
    },
    Tiles: {
        Rock:          {type: ResourceType.Tiles, offset: {x: 0  , y: 0  }, size: {w: TILE_SIZE, h: TILE_SIZE}},
        Grass:         {type: ResourceType.Tiles, offset: {x: 0  , y: 32 }, size: {w: TILE_SIZE, h: TILE_SIZE}},
        DarkDgn:       {type: ResourceType.Tiles, offset: {x: 0  , y: 64 }, size: {w: TILE_SIZE, h: TILE_SIZE}},
        Water:         {type: ResourceType.Tiles, offset: {x: 0  , y: 96 }, size: {w: TILE_SIZE, h: TILE_SIZE}},
        Path:          {type: ResourceType.Tiles, offset: {x: 0  , y: 128}, size: {w: TILE_SIZE, h: TILE_SIZE}},
        LitDgn:        {type: ResourceType.Tiles, offset: {x: 0  , y: 160}, size: {w: TILE_SIZE, h: TILE_SIZE}},
        PathRock:      {type: ResourceType.Tiles, offset: {x: 32 , y: 0  }, size: {w: TILE_SIZE, h: TILE_SIZE}},
        PathGrass:     {type: ResourceType.Tiles, offset: {x: 32 , y: 32 }, size: {w: TILE_SIZE, h: TILE_SIZE}},
        WallDarkDgn:   {type: ResourceType.Tiles, offset: {x: 32 , y: 64 }, size: {w: TILE_SIZE, h: TILE_SIZE}},
        WaterGrass:    {type: ResourceType.Tiles, offset: {x: 32 , y: 96 }, size: {w: TILE_SIZE, h: TILE_SIZE}},
        WaterPath:     {type: ResourceType.Tiles, offset: {x: 32 , y: 128}, size: {w: TILE_SIZE, h: TILE_SIZE}},
        WallLitDgn:    {type: ResourceType.Tiles, offset: {x: 32 , y: 160}, size: {w: TILE_SIZE, h: TILE_SIZE}},
        Grass50Cave50: {type: ResourceType.Tiles, offset: {x: 0  , y: 192}, size: {w: TILE_SIZE, h: TILE_SIZE}},
        Grass10Cave90: {type: ResourceType.Tiles, offset: {x: 32 , y: 192}, size: {w: TILE_SIZE, h: TILE_SIZE}},
        White50Cave50: {type: ResourceType.Tiles, offset: {x: 0  , y: 224}, size: {w: TILE_SIZE, h: TILE_SIZE}},
        White90Cave10: {type: ResourceType.Tiles, offset: {x: 32 , y: 224}, size: {w: TILE_SIZE, h: TILE_SIZE}},
        Crop:          {type: ResourceType.Tiles, offset: {x: 64 , y: 32 }, size: {w: TILE_SIZE, h: TILE_SIZE}},
        Entry:         {type: ResourceType.Tiles, offset: {x: 192, y: 160}, size: {w: TILE_SIZE, h: TILE_SIZE}},
        Building:      {type: ResourceType.Tiles, offset: {x: 192, y: 160}, size: {w: TILE_SIZE, h: TILE_SIZE}},
        Sign:          {type: ResourceType.Tiles, offset: {x: 160, y: 0  }, size: {w: TILE_SIZE, h: TILE_SIZE}}
    },
    Buildings: {
        Gate_NS      : {type:ResourceType.buildings_1x, offset: {x:0,y:0}, size:{w:96,h:32}},
        StrawHouse_EF: {type:ResourceType.buildings_3x, offset: {x:0,y:0}, size:{w:96,h:96}},
        StrawHouse_WF: {type:ResourceType.buildings_3x, offset: {x:192,y:0}, size:{w:96,h:96}},
        Hut_EF       : {type:ResourceType.buildings_2x, offset: {x:0,y:0}, size:{w:64,h:64}},
        HutTemple_NF : {type:ResourceType.buildings_5x, offset: {x:0,y:0}, size:{w:160,h:160}}
    }
}