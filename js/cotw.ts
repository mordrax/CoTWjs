/**
 * Created with JetBrains WebStorm.
 * User: mordrax
 * Date: 24/06/13
 * Time: 8:01 PM
 * To change this template use File | Settings | File Templates.
 */

///<reference path="references.ts"/>

var world = new World(MAPS.villageMap);
var hero = new Player();
var physicsX = new PhysicsEngine(hero);
var _currentGameState : IState;

function render(drawMap) {
    if (drawMap) {
        for (var x=0; x<world._tiles.length; x++) {
            for (var y=0; y<world._tiles.length; y++) {
                world._tiles[x][y]._tile._turn = world.determineRotation(x, y, world._map);
                world._tiles[x][y].Draw();
            }
        }
        // draw buildings
       // for (var i=0; i<)

    }
    hero._el.style["-webkit-transform"]="translate3d("+ hero._x*TILE_SIZE +'px,'+ hero._y*TILE_SIZE +"px,0px) ";// scale("+hero.scale+")";
    window.requestAnimationFrame(function() {render(false)});
}

function init() {
    world._$el = $("#background");
    world._el = world._$el.get(0);

    hero._$el = $("#hero");
    hero._el = hero._$el.get(0);

    _currentGameState = physicsX;

    render(true);
    $("body").css("display", "block");

    document.addEventListener( "keyup", function(event) { _currentGameState.SendEvent(event); }, false);
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