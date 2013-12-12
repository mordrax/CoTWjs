///<reference path="references.ts"/>
$(document).ready(function () {
    splashScreenEvents();
    if (getUrlVars("testing")) {
        startNewGame();
        return;
    }

    $('.popup').show();
    return;

    // show the cotw intro screen
    $('#splash-window').show();
    $('#splash-window .splash-sub-title').fadeIn(3000);
    // show the menu
    // 1. start new game
    // 2. options
    // 3. quit
});

var startNewGame = function () {
    var game = new Game();
    game.Start();
};

var charCreation = function () {
};

var splashScreenEvents = function () {
    $('#start-game').click(function () {
        $.blockUI({
            message: $('#char-creation-popup').html(),
            onOverlayClick: $.unblockUI,
            bindEvents: true
        });
        //startNewGame();
    });
    $('#load-game').click(function () {
    });
    $('#overview').click(function () {
    });
};
//# sourceMappingURL=cotw.js.map
