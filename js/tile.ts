/**
 * Created by mordrax on 18/07/13.
 */
var TILEDATA = {
    1:{ name:"Rock",          type: TileType.Solid,     turn:0    },
    2:{ name:"RockPath",      type: TileType.Solid,     turn:0    },
    3:{ name:"RockPath",      type: TileType.Solid,     turn:90   },
    4:{ name:"RockPath",      type: TileType.Solid,     turn:180  },
    5:{ name:"RockPath",      type: TileType.Solid,     turn:270  },
    6:{ name:"Grass",         type: TileType.Ground,    turn:0    },
    7:{ name:"GrassPath",     type: TileType.Ground,    turn:0    },
    8:{ name:"GrassPath",     type: TileType.Ground,    turn:90   },
    9:{ name:"GrassPath",     type: TileType.Ground,    turn:180  },
    10:{name:"GrassPath",     type: TileType.Ground,    turn:270  },
    11:{name:"DarkDgn",       type: TileType.Ground,    turn:0    },
    12:{name:"DarkDgnWall",   type: TileType.Solid,     turn:0    },
    13:{name:"DarkDgnWall",   type: TileType.Solid,     turn:90   },
    14:{name:"DarkDgnWall",   type: TileType.Solid,     turn:180  },
    15:{name:"DarkDgnWall",   type: TileType.Solid,     turn:270  },
    16:{name:"Water",         type: TileType.Water,     turn:0    },
    17:{name:"WaterGrass",    type: TileType.Water,     turn:0    },
    18:{name:"WaterGrass",    type: TileType.Water,     turn:90   },
    19:{name:"WaterGrass",    type: TileType.Water,     turn:180  },
    20:{name:"WaterGrass",    type: TileType.Water,     turn:270  },
    21:{name:"Path",          type: TileType.Ground,    turn:0    },
    22:{name:"WaterPath",     type: TileType.Water,     turn:0    },
    23:{name:"WaterPath",     type: TileType.Water,     turn:90   },
    24:{name:"WaterPath",     type: TileType.Water,     turn:180  },
    25:{name:"WaterPath",     type: TileType.Water,     turn:270  },
    26:{name:"LitDgn",        type: TileType.Ground,    turn:0    },
    27:{name:"LitDgnWall",    type: TileType.Solid,     turn:0    },
    28:{name:"LitDgnWall",    type: TileType.Solid,     turn:90   },
    29:{name:"LitDgnWall",    type: TileType.Solid,     turn:180  },
    30:{name:"LitDgnWall",    type: TileType.Solid,     turn:270  },
    31:{name:"Crop",          type: TileType.Ground,    turn:0    },
    32:{name:"Entry",         type: TileType.Entry,     turn:0    },
    33:{name:"Building",      type: TileType.Solid,     turn:0    },
    34:{name:"Sign",          type: TileType.Ground,    turn:0    }
};

class Tile {
    _$el: ZeptoCollection;
    _el : HTMLElement;
    _tile;

    constructor (target: string, tile, model) {
        this._tile = tile;
        this._$el = $("<div></div>", {class: "tile type_" + tile.name});
        this._el = this._$el.get(0);

        $(target).append(this._$el.toString());
    }

    updatePosition(_x : number, _y : number) {
        this._el.style["-webkit-transform"] = "translate3d(" + _x * TILE_SIZE + 'px,' + _y * TILE_SIZE + "px,0px) rotate(" + this._tile.turn + "deg)";
    }

}
