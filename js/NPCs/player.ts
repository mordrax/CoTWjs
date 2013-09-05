/// <reference path="../references.ts"/>

class Player extends Actor implements IDrawable {

    constructor() {
        super();

        this.Position = new Point(10, 15);
    }

    Draw(ctx : CanvasRenderingContext2D) {
        ctx.drawImage(MONSTER_IMG,
            0, 0,TILE_SIZE, TILE_SIZE,
            this.Position.X*TILE_SIZE, this.Position.Y*TILE_SIZE, TILE_SIZE, TILE_SIZE);
        //this._el.style["-webkit-transform"]="translate3d("+ this.Position.X*TILE_SIZE +'px,'+ this.Position.Y*TILE_SIZE +"px,0px) ";// scale("+hero.scale+")";
    }
}