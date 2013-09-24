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
    _canvas : HTMLCanvasElement;
    _ctx : CanvasRenderingContext2D;
    _resources : {};
    _loading : number;

    _screenSize : Point;
    _centerPoint : Point;
    _areaSize : Point;
    _positionOffset : Point;


    constructor() {
        this._canvas = (<HTMLCanvasElement>$('#world')[0]);
        this._ctx = this._canvas.getContext('2d');
        this._resources = {};
        this._loading = 0;
        this._centerPoint = new Point(0,0);
        this.LoadResources();
        this.InitialiseScreen();

        Game.World.updatedEvent.add((e:Entity) => {
            var s = e.sprite;
            var l = e.location;
            this._ctx.drawImage(this._resources[s.type], s.offset.x, s.offset.y, s.size.w, s.size.h, (-this._centerPoint.X + l.position.X)*TILE_SIZE+this._screenSize.X/2, (-this._centerPoint.Y + l.position.Y)*TILE_SIZE+this._screenSize.Y/2, s.size.w, s.size.h);
        });

        $(window).on('resize', () => this.InitialiseScreen());
    }

    public UpdateCenter(point:Point) {
        this._centerPoint = point;
    }

    private createImgElement(src : string) : HTMLImageElement {
        var elm = document.createElement('img');
        elm.src = src;
        return elm;
    }

    private InitialiseScreen() {
        this._screenSize = new Point($(window).width(), $(window).height());
        this._canvas.width = this._screenSize.X-64;
        this._canvas.height = this._screenSize.Y-64;

        console.log('initialising screen');
    }

    public Clear() {
        this._ctx.clearRect(0,0,this._canvas.width, this._canvas.height);
    }

//    private UpdatePositionOffset() {
//        if (this._centerPoint === undefined || this._centerPoint === null) return;
//        if (this._screenSize === undefined || this._screenSize === null) return;
//
//    }

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
