/// <reference path="../references.ts"/>

class Player extends Actor implements IDrawable {
    _$el:ZeptoCollection;
    _el:HTMLElement;

    constructor($el) {
        super();

        this._$el = $el;
        this._el = $el.get(0);

        this.Position = new Point(10, 15);
    }

    Draw() {
        this._el.style["-webkit-transform"]="translate3d("+ this.Position.X*TILE_SIZE +'px,'+ this.Position.Y*TILE_SIZE +"px,0px) ";// scale("+hero.scale+")";
    }
}