/// <reference path="../references.ts"/>
class GraphicsEngine {
    _canvas : HTMLCanvasElement;
    _ctx : CanvasRenderingContext2D;
    _resources : {};
    _loading : number;

    _centerPoint : Point;
    _canvasTileSize:Point;

    constructor() {
        this._canvas = (<HTMLCanvasElement>$('#world')[0]);
        this._ctx = this._canvas.getContext('2d');
        this._resources = {};
        this._loading = 0;
        this._centerPoint = new Point(0,0);
        this.LoadResources();
        this.InitialiseScreen();

        Game.World.updatedEvent.add((entity:Entity) => {
            var sprite = entity.sprite;
            var location = entity.location;

            var canvasPos = new Point(
                (location.position.X-this._centerPoint.X+this._canvasTileSize.X/2)*TILE_SIZE,
                (location.position.Y-this._centerPoint.Y+this._canvasTileSize.Y/2)*TILE_SIZE
            );
            if (entity.sprite.turn != 0) {
                this._ctx.save();
                this._ctx.translate(canvasPos.X + TILE_SIZE/2, canvasPos.Y + TILE_SIZE/2);
                this._ctx.rotate(entity.sprite.turn);
                this._ctx.translate(-canvasPos.X - TILE_SIZE/2, -canvasPos.Y - TILE_SIZE/2);
            }

            this._ctx.drawImage(
                this._resources[sprite.type], // src image
                sprite.offset.x, sprite.offset.y,  // start pixel in src
                sprite.size.w, sprite.size.h,      // pixel size of src
                canvasPos.X, canvasPos.Y, // pixel location on canvas
                sprite.size.w, sprite.size.h       // pixel size on canvas
            );

            if (entity.sprite.turn != 0) {
                this._ctx.restore();
            }
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
        var screenSize = new Point($(window).width(), $(window).height());
        this._canvas.width = screenSize.X-128;
        this._canvas.height = screenSize.Y-256;

        this._canvasTileSize = new Point(
            Math.floor(this._canvas.width/TILE_SIZE),
            Math.floor(this._canvas.height/TILE_SIZE)
        );

        console.log('initialising screen');
    }

    public Clear() {
        this._ctx.clearRect(0,0,this._canvas.width, this._canvas.height);
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