/// <reference path="../references.ts"/>

class Player extends NPC implements IDrawable {
    _x:number;
    _y:number;
    _$el:ZeptoCollection;
    _el:HTMLElement;

    constructor($el) {
        super();

        this._$el = $el;
        this._el = $el.get(0);

        this._x = 10;
        this._y = 15;
    }

    Draw() {
        this._el.style["-webkit-transform"]="translate3d("+ this._x*TILE_SIZE +'px,'+ this._y*TILE_SIZE +"px,0px) ";// scale("+hero.scale+")";
    }

    moveLeft() {
        this._x -= 1;
    }

    moveRight() {
        this._x += 1;
    }

    moveUp() {
        this._y -= 1;
    }

    moveDown() {
        this._y += 1;
    }
}