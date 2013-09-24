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

class GraphicsEngine {
    _ctx : CanvasRenderingContext2D;
    _resources : {};
    _loading : number;

    constructor() {
        this._ctx = (<HTMLCanvasElement>$('#world')[0]).getContext('2d');
        this._resources = {};
        this._loading = 0;
        this.LoadResources();

        Game.World.updatedEvent.add((e:Entity) => {
            var s = e.sprite;
            var l = e.location;
            this._ctx.drawImage(this._resources[s.type], s.offset.x, s.offset.y, s.size.w, s.size.h, l.position.X*TILE_SIZE, l.position.Y*TILE_SIZE, s.size.w, s.size.h);
        });
    }

    private createImgElement(src : string) : HTMLImageElement {
        var elm = document.createElement('img');
        elm.src = src;
        return elm;
    }

    private LoadResources() {
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
        this._resources[ResourceType.buildings_1x     ] = this.createImgElement('assets/resources/1x_buildings.png');
    }
}
