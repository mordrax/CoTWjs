/**
 * Created with JetBrains WebStorm.
 * User: mordrax
 * Date: 24/06/13
 * Time: 8:01 PM
 * To change this template use File | Settings | File Templates.
 */

/// <reference path="zepto.d.ts"/>
/// <reference path="globals.ts"/>
/// <reference path="tile.ts"/>
/// <reference path="maps.ts"/>
/// <reference path="world.ts"/>
/// <reference path="player.ts"/>
/// <reference path="cordova.js/>

var world = new World(MAPS.villageMap);
var hero = new Player();

function render(drawMap) {
    if (drawMap) {
        for (var x=0; x<world._tiles.length; x++) {
            for (var y=0; y<world._tiles.length; y++) {
                world._tiles[x][y].updatePosition( x, y );
            }
        }
    }
    hero._el.style["-webkit-transform"]="translate3d("+ hero._x*TILE_SIZE +'px,'+ hero._y*TILE_SIZE +"px,0px) ";// scale("+hero.scale+")";
    window.requestAnimationFrame(function() {render(false)});
}

function init(event) {
    world._$el = $("#background");
    world._el = world._$el.get(0);

    hero._$el = $("#hero");
    hero._el = hero._$el.get(0);

    render(true);
    $("body").css("display", "block");

    document.addEventListener( "keyup", function(event) { update(event, hero); }, false);
}

function update(event, hero) {
    hero.update(event.keyCode);
}

addEventListener("load", init );

////detect if web or phonegap ( via http://stackoverflow.com/questions/8068052/phonegap-detect-if-running-on-desktop-browser)
//function isPhoneGap() {
//    return ((cordova || PhoneGap || phonegap)
//        && /^file:\/{3}[^\/]/i.test(document.location.href)
//        && /ios|iphone|ipod|ipad|android/i.test(navigator.userAgent)) ||
//        window.tinyHippos; //this is to cover phonegap emulator
//}
//
//if ( isPhoneGap() ) {
//    document.addEventListener( "deviceready", init );
//} else {
//    document.addEventListener("load", init );
//}