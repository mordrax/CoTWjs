/**
 * Created by mordrax on 19/07/13.
 */

/// <reference path="zepto.d.ts"/>
/// <reference path="tile.ts"/>

class World {
    _map : number[][];
    _$el : ZeptoCollection;
    _el : HTMLHtmlElement;
    _tiles: Tile[][];

    constructor (map: number[][])
    {
        this._map = map;

        for (var x=0; x<this._map.length; x++) {
            this._tiles[x] = new Array<Tile>();
            for (var y=0; y<this._map[x].length; y++) {
                this._tiles[x][y] = new Tile("#background", TILEDATA[this._map[x][y]]);
            }
        }
    }
}