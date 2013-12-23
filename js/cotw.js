///<reference path="references.ts"/>
/**
* Used as string literal for element ids
*/
var AttrType;
(function (AttrType) {
    AttrType[AttrType["available"] = 0] = "available";
    AttrType[AttrType["strength"] = 1] = "strength";
    AttrType[AttrType["intelligence"] = 2] = "intelligence";
    AttrType[AttrType["dexterity"] = 3] = "dexterity";
    AttrType[AttrType["constitution"] = 4] = "constitution";
})(AttrType || (AttrType = {}));

$(document).ready(function () {
    splashScreenEvents();
    if (getUrlVars("testing")) {
        startNewGame();
        return;
    }

    // show the cotw intro screen
    var $splash = $('#splash-window');
    $splash.show();
    $splash.find('.splash-sub-title').fadeIn(3000);
    // show the menu
    // 1. start new game
    // 2. options
    // 3. quit
});

function startNewGame() {
    var game = new Game();
    game.Start();
}

/**
* Create a character, and start the game!
* - Popup the char creation screen
* - Set default values
* - On 'OK' create a hero and start the game
*/
function charCreation() {
    // create the char creation element jquery.blockui
    $.blockUI({
        message: $('#char-creation-popup').html(),
        onOverlayClick: $.unblockUI,
        bindEvents: true,
        css: { width: '440px', height: '440px', top: '20%', cursor: 'default' }
    });

    // create sliders for attributes
    [AttrType.strength, AttrType.intelligence, AttrType.dexterity, AttrType.constitution].forEach(function (attr) {
        var $attrSlider = $(Format('#{0} .bar-slider', AttrType[attr]));

        $attrSlider.slider({
            orientation: "vertical",
            range: "min",
            min: 0,
            max: 100,
            value: 25,
            step: 1,
            change: function (event, ui) {
                if (ui.value < 25) {
                    $attrSlider.slider({ value: 25 });
                    return;
                } else if (ui.value > 75) {
                    $attrSlider.slider({ value: 75 });
                    return;
                }

                // restrict attributes so available stays within 0-100
                var attributeID = $(event.target).parent().attr('id');
                var attrDelta = ui.value - char[attributeID];
                if (char.available - attrDelta < 0) {
                    $attrSlider.slider({ value: char[attributeID] + char.available });
                    return;
                } else if (char.available - attrDelta > 100) {
                    $attrSlider.slider({ value: char[attributeID] - char.available });
                    return;
                }

                // by this point, attrDelta conforms to all constraints, update stats
                char[attributeID] += attrDelta;
                char.available -= attrDelta;

                // update screen
                $(event.target).siblings('.bar').find('.bar-weight').css("top", 100 - char[attributeID] + "%");
                $('#available .bar-weight').css('top', 100 - char.available + '%');
            }
        });
    });

    $('.bar-slider button').click(function (event) {
        var attrDelta = $(this).hasClass('increase') ? 1 : -1;
        var $slider = $(event.target).parent().slider();
        $slider.slider({ value: ($slider.slider('value') + attrDelta) });
    });

    // char object to be used for created hero
    var char = {
        name: '',
        gender: GenderType.Male,
        available: 100,
        strength: 25,
        dexterity: 25,
        constitution: 25,
        intelligence: 25,
        difficulty: DifficultyType.Intermediate
    };
}

function splashScreenEvents() {
    $('#start-game').click(charCreation);
    $('#load-game').click(function () {
    });
    $('#overview').click(function () {
    });
}
//# sourceMappingURL=cotw.js.map
