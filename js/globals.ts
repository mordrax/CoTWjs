/// <reference path="references.ts"/>

//var hasTouch = ('ontouchstart' in window);
//var TOUCH_START = hasTouch ? "touchstart" : "mousedown";
//var TOUCH_MOVE = hasTouch ? "touchmove" : "mousemove";
//var TOUCH_END = hasTouch ? "touchend" : "mouseup";

// Visible window dimensions, set at start and when manually configured (will need to recalculate tiles visible etc)
var WINDOW_WIDTH = Math.min($(window).width(), 640);
var WINDOW_HEIGHT = Math.min($(window).height(), 640);
// pixel size of each tile
var TILE_SIZE = 32;
// Amount of tiles to display
var TILES_X = parseInt((WINDOW_WIDTH/TILE_SIZE).toString());
var TILES_Y = parseInt((WINDOW_HEIGHT/TILE_SIZE).toString());

var renders = 0;


var HERO_IMG = new Image();
HERO_IMG.src = "assets/resources/monsters.png";

var TILE_IMG = new Image();
TILE_IMG.src = "assets/resources/tiles.png";