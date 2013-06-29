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
    cols:0,
    rows:0
}

var hero = {
    $el:undefined,
    el:undefined,
    w:32,
    h:32,
    x:0,
    y:0
};

var $win;

function Tile(col, row, target, css, model) {
    this.model = model;
    this.col = col;
    this.row = row;
    this.css = css;
    this.$el = $("<div></div>", {class: "tile type_" + css});
    this.el = this.$el.get(0);

    $(target).append( this.$el );
}

Tile.prototype.updatePosition = function ( _x, _y ) {
    this.el.style["-webkit-transform"]="translate3d("+ _x * TILE_SIZE +'px,'+ _y * TILE_SIZE +"px,0px)";
}

function generateWorld() {
    $win = $(window);

    world.$el.empty();
    world.tiles = [];

    world.cols = town_map.length; //Math.ceil($(window).width()/TILE_SIZE)+1;
    world.rows = town_map[0].length; //Math.ceil($(window).height()/TILE_SIZE)+1;

    for (var x=0; x<world.cols; x++) {

        world.tiles[x] = [];

        for (var y=0; y<world.rows; y++) {
            world.tiles[x][y] = new Tile(x, y, "#background", town_map[x][y], world);
        }

    }

    console.log(world);
}

function render(){
//    translate.x += Math.sin( input.angle ) * Math.floor(input.distance);
//    translate.y += Math.cos( input.angle ) * Math.floor(input.distance);
//
//    translate.x = Math.floor(translate.x);
//    translate.y = Math.floor(translate.y);

    for (var x=0; x<world.tiles.length; x++) {

        for (var y=0; y<world.tiles[x].length; y++) {
            world.tiles[x][y].updatePosition( x, y );
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

    hero.x = ($win.width() - hero.w)/2;
    hero.y = ($win.height() - hero.h)/2;
    hero.el.style["-webkit-transform"]="translate3d("+ hero.x +'px,'+ hero.y +"px,0px) ";// scale("+hero.scale+")";
    hero.$el.removeClass().addClass("hero_" + (7-hero.walk) +"_"+hero.direction);

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


    renders++;

    window.requestAnimationFrame(function() {
        render()
    } );
}

function init(event) {
    world.$el = $("#background");
    world.el = world.$el.get(0);

    generateWorld();

    hero.scale = ($win.height() * hero.heightTarget)/hero.h;
    hero.$el = $("#hero");
    hero.el = hero.$el.get(0);

    render();
    $("body").css("display", "block");
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