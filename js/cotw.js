/**
* Created with JetBrains WebStorm.
* User: mordrax
* Date: 24/06/13
* Time: 8:01 PM
* To change this template use File | Settings | File Templates.
*/
///<reference path="references.ts"/>
var game = new Game();

var InitialiseUI = function () {
    $('button.menu').button();

    $('button.quick-menu').button();

    // create file menu, set to not visible
    $('#file-menu-file').click(function () {
        $('#menu-file').toggle();
    });

    $('#file-menu-character').click(function () {
        console.log('Please implement the character menu!!!');
    });
    $('#file-menu-inventory').click(function () {
        console.log('Please implement the inventory menu!!!');
    });
    $('#file-menu-map').click(function () {
        console.log('Please implement the map menu!!!');
    });
    $('#file-menu-spell').click(function () {
        console.log('Please implement the spell menu!!!');
    });
    $('#file-menu-activate').click(function () {
        console.log('Please implement the activate menu!!!');
    });
    $('#file-menu-verbs').click(function () {
        console.log('Please implement the verbs menu!!!');
    });
    $('#file-menu-window').click(function () {
        console.log('Please implement the window menu!!!');
    });
    $('#menu-window-main').click(function () {
        gotoScreen(ScreenType.Main);
    });
    $('#menu-window-shop').click(function () {
        gotoScreen(ScreenType.Shop);
    });
    $('#menu-exit').click(function () {
        gotoScreen(ScreenType.Main);
    });
    $('#menu-sortpack').click(function () {
        $('#top-window').append('<div class="equipment"></div>');
    });
    $('#menu-nameobject').click(function () {
        $('#bottom-window').append('<div class="equipment"></div>');
    });
};

var gotoScreen = function (screen) {
    switch (screen) {
        case ScreenType.Shop:
            $('#main-game-window').hide();
            $('#shop-window').show();
            $('[data-visible-menu="main"]').hide();
            $('[data-visible-menu="shop"]').show();
            break;
        case ScreenType.Main:
        default:
            $('#main-game-window').show();
            $('#shop-window').hide();
            $('[data-visible-menu="main"]').show();
            $('[data-visible-menu="shop"]').hide();
    }
};

function pageReady() {
    InitialiseUI();

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
