/**
 * Created with JetBrains WebStorm.
 * User: mordrax
 * Date: 24/06/13
 * Time: 8:01 PM
 * To change this template use File | Settings | File Templates.
 */
var world = {
    $el:undefined,
    el:undefined,
    tiles:[],
    tileSize:TILE_SIZE,
    map:undefined
}

var $win;

function Tile(col, row, target, css, model) {
    this.model = model;
    this.css = css;
    this.$el = $("<div></div>", {class: "tile type_" + css.name + " rotate_" + css.rotate});
    this.el = this.$el.get(0);

    $(target).append( this.$el );
}

Tile.prototype.updatePosition = function ( _x, _y ) {
    this.el.style["-webkit-transform"]="translate3d("+ _x * TILE_SIZE +'px,'+ _y * TILE_SIZE +"px,0px)";
}

function generateWorld(map) {
    $win = $(window);

    world.map = map;
    world.$el.empty();
    world.tiles = [];

    for (var x=0; x<world.map.length; x++) {
        world.tiles[x] = [];
        for (var y=0; y<world.map[x].length; y++) {
            world.tiles[x][y] = new Tile(x, y, "#background", tile_data[world.map[x][y]], world);
        }
    }
}

function render(drawMap){
//    translate.x += Math.sin( input.angle ) * Math.floor(input.distance);
//    translate.y += Math.cos( input.angle ) * Math.floor(input.distance);
//
//    translate.x = Math.floor(translate.x);
//    translate.y = Math.floor(translate.y);

    if (drawMap) {
        for (var x=0; x<world.tiles.length; x++) {
            for (var y=0; y<world.tiles[x].length; y++) {
                world.tiles[x][y].updatePosition( x, y );
            }
        }
    }

//enemy background sprites

//    for (var x=0; x<backgroundSprites.sprites.length; x++) {
//        backgroundSprites.sprites[x].updatePosition( translate.x, translate.y );
//    }
//
//    for (var x=0; x<enemySprites.sprites.length; x++) {
//
//        var sprite = enemySprites.sprites[x];
//
//        var rand = Math.floor( Math.random() * 10 );
//        if ( renders % (30+rand) == 0) {
//            sprite.direction += (Math.random() * 2 > 1 ? 1 : -1 ) * Math.random() * Math.PI/3;
//        }
//
//        sprite.x += Math.sin(sprite.direction) * 2;
//        sprite.y += Math.cos(sprite.direction) * 2;
//
//        if ( sprite.scale > 1.15 || sprite.scale < .85){
//            sprite.scaleModifier *= -1;
//        }
//
//        sprite.scale += sprite.scaleModifier;
//
//        sprite.updatePosition( translate.x, translate.y );
//    }


/* input distance */

//    if (input.distance > 0) {
//
//        var MAX_WALK_FRAMES = 12;
//        var max_dst = $win.width()/2;
//        var dst = Math.min (input.distance, $win.width());
//
//
//        var w = (dst / max_dst)*10;
//        w = Math.round(MAX_WALK_FRAMES * (1-w));
//        w = Math.max(1,w);
//        //console.log(w)
//
//        if ( renders % w == 0) {
//            hero.walk++;
//            hero.walk = (hero.walk%8)
//        }
//    }

    hero.el.style["-webkit-transform"]="translate3d("+ hero.x*TILE_SIZE +'px,'+ hero.y*TILE_SIZE +"px,0px) ";// scale("+hero.scale+")";

    /* compass */
    /*if ( compass.visible ){
        //console.log( (input.start.x-(compass.w/2)), (input.start.y-(compass.h/2)))
        var style = "translate3d("+ (input.start.x-(compass.w/2)) +'px,'+ (input.start.y-(compass.h/2)) +"px,0px)";
        //console.log(style);
        compass.el.style["-webkit-transform"]= style;

        style = "translate3d("+ (input.current.x-(touch.w/2)) +'px,'+ (input.current.y-(touch.h/2)) +"px,0px)";
        touch.el.style["-webkit-transform"]= style;

        var segmentX = (input.current.x + Math.sin(input.angle)*(input.distance*10/3) )-(touch.w/2);
        var segmentY = (input.current.y + Math.cos(input.angle)*(input.distance*10/3) )-(touch.h/2);
        style = "translate3d("+ segmentX +'px,'+ segmentY +"px,0px)";
        touchSegment0.el.style["-webkit-transform"]= style;

        segmentX = (input.current.x + Math.sin(input.angle)*(input.distance*20/3) )-(touch.w/2);
        segmentY = (input.current.y + Math.cos(input.angle)*(input.distance*20/3) )-(touch.h/2);
        style = "translate3d("+ segmentX +'px,'+ segmentY +"px,0px)";
        touchSegment1.el.style["-webkit-transform"]= style;
    }
    else {
        //just render them offscreen
        compass.el.style["-webkit-transform"]="translate3d(-200px,-200px,0px)";
        touch.el.style["-webkit-transform"]="translate3d(-200px,-200px,0px)";
        touchSegment0.el.style["-webkit-transform"]="translate3d(-200px,-200px,0px)";
        touchSegment1.el.style["-webkit-transform"]="translate3d(-200px,-200px,0px)";
    }*/


    window.requestAnimationFrame(function() {render(false)});
}

function init(event) {
    world.$el = $("#background");
    world.el = world.$el.get(0);

    generateWorld(farm_map);

    hero = new Player();
    hero.$el = $("#hero");
    hero.el = hero.$el.get(0);

    render(true);
    $("body").css("display", "block");

    window.addEventListener('keyup', function(event) { update(event); }, false);
}

function update(event) {
    hero.update(event.keyCode);
}

//detect if web or phonegap ( via http://stackoverflow.com/questions/8068052/phonegap-detect-if-running-on-desktop-browser)
function isPhoneGap() {
    return ((cordova || PhoneGap || phonegap)
        && /^file:\/{3}[^\/]/i.test(window.location.href)
        && /ios|iphone|ipod|ipad|android/i.test(navigator.userAgent)) ||
        window.tinyHippos; //this is to cover phonegap emulator
}

if ( isPhoneGap() ) {
    document.addEventListener( "deviceready", init );
}
else {
    window.addEventListener( "load", init );
}