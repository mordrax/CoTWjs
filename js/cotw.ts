/**
 * Created with JetBrains WebStorm.
 * User: mordrax
 * Date: 24/06/13
 * Time: 8:01 PM
 * To change this template use File | Settings | File Templates.
 */

///<reference path="references.ts"/>

var game = new Game();

function pageReady() {
    // show the cotw intro screen

    // show the menu

    // 1. start new game

    // 2. options

    // 3. quit

    game.Start();
}

addEventListener("load", pageReady() );

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