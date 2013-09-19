/// <reference path="../references.ts"/>
class GraphicsEngine {
    _ctx : CanvasRenderingContext2D;
    public Sprites = new collections.Dictionary<Sprites, HTMLElement>();
    static MONSTER_IMG  = "assets/resources/monsters.png";
    static TILE_IMG     = "assets/resources/tiles.png";

    constructor() {
        this._ctx = (<HTMLCanvasElement>$('#world')[0]).getContext('2d');

        this.Sprites = new collections.Dictionary<Sprites, HTMLElement>();
        this.Sprites.setValue(Sprites.Player,        this.CreateImage(GraphicsEngine.MONSTER_IMG));
        this.Sprites.setValue(Sprites.Rock,          this.CreateImage(GraphicsEngine.TILE_IMG));
        this.Sprites.setValue(Sprites.Grass,         this.CreateImage(GraphicsEngine.TILE_IMG));
        this.Sprites.setValue(Sprites.DarkDgn,       this.CreateImage(GraphicsEngine.TILE_IMG));
        this.Sprites.setValue(Sprites.Water,         this.CreateImage(GraphicsEngine.TILE_IMG));
        this.Sprites.setValue(Sprites.Path,          this.CreateImage(GraphicsEngine.TILE_IMG));
        this.Sprites.setValue(Sprites.LitDgn,        this.CreateImage(GraphicsEngine.TILE_IMG));
        this.Sprites.setValue(Sprites.PathRock,      this.CreateImage(GraphicsEngine.TILE_IMG));
        this.Sprites.setValue(Sprites.PathGrass,     this.CreateImage(GraphicsEngine.TILE_IMG));
        this.Sprites.setValue(Sprites.WallDarkDgn,   this.CreateImage(GraphicsEngine.TILE_IMG));
        this.Sprites.setValue(Sprites.WaterGrass,    this.CreateImage(GraphicsEngine.TILE_IMG));
        this.Sprites.setValue(Sprites.WaterPath,     this.CreateImage(GraphicsEngine.TILE_IMG));
        this.Sprites.setValue(Sprites.WallLitDgn,    this.CreateImage(GraphicsEngine.TILE_IMG));
        this.Sprites.setValue(Sprites.Grass50Cave50, this.CreateImage(GraphicsEngine.TILE_IMG));
        this.Sprites.setValue(Sprites.Grass10Cave90, this.CreateImage(GraphicsEngine.TILE_IMG));
        this.Sprites.setValue(Sprites.White50Cave50, this.CreateImage(GraphicsEngine.TILE_IMG));
        this.Sprites.setValue(Sprites.White90Cave10, this.CreateImage(GraphicsEngine.TILE_IMG));
        this.Sprites.setValue(Sprites.Crop,          this.CreateImage(GraphicsEngine.TILE_IMG));
        this.Sprites.setValue(Sprites.Entry,         this.CreateImage(GraphicsEngine.TILE_IMG));
        this.Sprites.setValue(Sprites.Building,      this.CreateImage(GraphicsEngine.TILE_IMG));
        this.Sprites.setValue(Sprites.Sign,          this.CreateImage(GraphicsEngine.TILE_IMG));

        Game.World.updatedEvent.add((e:Entity) => {
            var s = e.sprite;
            var l = e.location;
            this._ctx.drawImage(this.Sprites.getValue(s.imgSprites), s.imgOffset.X, s.imgOffset.Y, s.imgSize.X, s.imgSize.Y, l.position.X* s.imgSize.X, l.position.Y* s.imgSize.Y, s.imgSize.X, s.imgSize.Y);
        });
    }

    CreateImage(src:string) : HTMLElement {
        var img = document.createElement('img');
        img.src = src;
        return img;
    }
}
