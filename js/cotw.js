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

$(document).ready(function () {
    pageReady();
});
//# sourceMappingURL=cotw.js.map
