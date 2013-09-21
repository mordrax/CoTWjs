/// <reference path="../references.ts"/>

class Sprite {
    img:HTMLImageElement;
    imgOffset:Point;
    imgSize:Point;

    constructor(img:HTMLImageElement, offset:Point, size:Point=new Point(TILE_SIZE, TILE_SIZE)) {
        this.img = img;
        this.imgOffset = offset;
        this.imgSize = size;
    }
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
    Objects         ,
    Spells          ,
    Tiles
}

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
    }
}

var Sprites : ISprite = {
    Actors : {
        Player : {type:ResourceType.Monsters, offset:{x:0,y:0}, size:{w:TILE_SIZE,h:TILE_SIZE}}
    },
    Tiles : {
        Rock          : {type:ResourceType.Tiles, offset:{x:0  ,y:0  }, size:{w:TILE_SIZE,h:TILE_SIZE}},
        Grass         : {type:ResourceType.Tiles, offset:{x:0  ,y:32 }, size:{w:TILE_SIZE,h:TILE_SIZE}},
        DarkDgn       : {type:ResourceType.Tiles, offset:{x:0  ,y:64 }, size:{w:TILE_SIZE,h:TILE_SIZE}},
        Water         : {type:ResourceType.Tiles, offset:{x:0  ,y:96 }, size:{w:TILE_SIZE,h:TILE_SIZE}},
        Path          : {type:ResourceType.Tiles, offset:{x:0  ,y:128}, size:{w:TILE_SIZE,h:TILE_SIZE}},
        LitDgn        : {type:ResourceType.Tiles, offset:{x:0  ,y:160}, size:{w:TILE_SIZE,h:TILE_SIZE}},
        PathRock      : {type:ResourceType.Tiles, offset:{x:32 ,y:0  }, size:{w:TILE_SIZE,h:TILE_SIZE}},
        PathGrass     : {type:ResourceType.Tiles, offset:{x:32 ,y:32 }, size:{w:TILE_SIZE,h:TILE_SIZE}},
        WallDarkDgn   : {type:ResourceType.Tiles, offset:{x:32 ,y:64 }, size:{w:TILE_SIZE,h:TILE_SIZE}},
        WaterGrass    : {type:ResourceType.Tiles, offset:{x:32 ,y:96 }, size:{w:TILE_SIZE,h:TILE_SIZE}},
        WaterPath     : {type:ResourceType.Tiles, offset:{x:32 ,y:128}, size:{w:TILE_SIZE,h:TILE_SIZE}},
        WallLitDgn    : {type:ResourceType.Tiles, offset:{x:32 ,y:160}, size:{w:TILE_SIZE,h:TILE_SIZE}},
        Grass50Cave50 : {type:ResourceType.Tiles, offset:{x:0  ,y:192}, size:{w:TILE_SIZE,h:TILE_SIZE}},
        Grass10Cave90 : {type:ResourceType.Tiles, offset:{x:32 ,y:192}, size:{w:TILE_SIZE,h:TILE_SIZE}},
        White50Cave50 : {type:ResourceType.Tiles, offset:{x:0  ,y:224}, size:{w:TILE_SIZE,h:TILE_SIZE}},
        White90Cave10 : {type:ResourceType.Tiles, offset:{x:32 ,y:224}, size:{w:TILE_SIZE,h:TILE_SIZE}},
        Crop          : {type:ResourceType.Tiles, offset:{x:64 ,y:32 }, size:{w:TILE_SIZE,h:TILE_SIZE}},
        Entry         : {type:ResourceType.Tiles, offset:{x:192,y:160}, size:{w:TILE_SIZE,h:TILE_SIZE}},
        Building      : {type:ResourceType.Tiles, offset:{x:192,y:160}, size:{w:TILE_SIZE,h:TILE_SIZE}},
        Sign          : {type:ResourceType.Tiles, offset:{x:160,y:0  }, size:{w:TILE_SIZE,h:TILE_SIZE}}
    },
    Buildings : {

    }
}

class GraphicsEngine {
    _ctx : CanvasRenderingContext2D;
    _resources : {};

    constructor() {
        this._ctx = (<HTMLCanvasElement>$('#world')[0]).getContext('2d');
        this._resources = {};
        this.LoadResources();

        Game.World.updatedEvent.add((e:Entity) => {
            var s = e.sprite;
            var l = e.location;
            this._ctx.drawImage(this._resources[s.type], s.offset.x, s.offset.y, s.size.w, s.size.h, l.position.X* s.size.w, l.position.Y* s.size.h, s.size.w, s.size.h);
        });
    }

    private createImgElement(src : string) : HTMLImageElement {
        var elm = document.createElement('img');
        elm.src = src;
        return elm;
    }

    private LoadResources() {
        this._resources[ResourceType.buildings_1x     ] = this.createImgElement('assets/resources/1x_buildings.png');
        this._resources[ResourceType.buildings_2x     ] = this.createImgElement('assets/resources/2x_buildings.png');
        this._resources[ResourceType.buildings_3x     ] = this.createImgElement('assets/resources/3x_buildings.png');
        this._resources[ResourceType.buildings_4x     ] = this.createImgElement('assets/resources/4x_buildings.png');
        this._resources[ResourceType.buildings_5x     ] = this.createImgElement('assets/resources/5x_buildings.png');
        this._resources[ResourceType.SpellEffects     ] = this.createImgElement('assets/resources/spell_effects.png');
        this._resources[ResourceType.DifficultyLevel  ] = this.createImgElement('assets/resources/difficulty_level.png');
        this._resources[ResourceType.Monsters         ] = this.createImgElement('assets/resources/monsters.png');
        this._resources[ResourceType.Objects          ] = this.createImgElement('assets/resources/objects.png');
        this._resources[ResourceType.Spells           ] = this.createImgElement('assets/resources/spells.png');
        this._resources[ResourceType.Tiles            ] = this.createImgElement('assets/resources/tiles.png');
    }
}
