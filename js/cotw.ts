///<reference path="references.ts"/>

/**
 * Used as string literal for element ids
 */
enum AttrType {
    available,
    strength,
    intelligence,
    dexterity,
    constitution
}

$(document).ready(function() {
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

function startNewGame(char?:ICharCreation) {
    var char:ICharCreation = char || {
        name:'tester',
        gender:       GenderType.Male,
        available:    0,
        strength:     80,
        dexterity:    90,
        constitution: 100,
        intelligence: 25,
        difficulty:   DifficultyType.Intermediate
    };
    var game = new Game(char);
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
        bindEvents:true,
        css: {width: '440px', height: '440px', top:'20%', cursor:'default'}
    });

    // char object to be used for created hero
    var char:ICharCreation = {
        name:         '',
        gender:       GenderType.Male,
        available:    50,
        strength:     50,
        dexterity:    50,
        constitution: 50,
        intelligence: 50,
        difficulty:   DifficultyType.Intermediate
    };

    // create sliders for attributes
    [AttrType.strength, AttrType.intelligence, AttrType.dexterity, AttrType.constitution].forEach(function (attr) {
        var $attrSlider = $(Format('#{0} .bar-slider', AttrType[attr]));
        $attrSlider.slider({
            orientation: "vertical",
            range: "min",
            min: 0,
            max: 100,
            value: char[AttrType[attr]],
            step:1,
            change: (event, ui) => {
                // restrict slider to 25-75 range as in CoTW
                if (ui.value < 25) {
                    $attrSlider.slider({value:25});
                    return;
                } else if (ui.value > 75) {
                    $attrSlider.slider({value:75});
                    return;
                }

                // restrict attributes so available stays within 0-100
                var attributeID = $(event.target).parent().attr('id');
                var availableDelta = char[attributeID] - ui.value;
                if (char.available + availableDelta < 0) {
                    $attrSlider.slider({value:char[attributeID]+char.available});
                    return;
                } else if (char.available + availableDelta > 100) {
                    $attrSlider.slider({value:char[attributeID]+100-char.available});
                    return;
                }

                // by this point, attrDelta conforms to all constraints, update stats
                char[attributeID]-=availableDelta;
                char.available+=availableDelta;

                // update screen
                $(event.target).siblings('.bar').find('.bar-weight').css("top", 100-char[attributeID] + "%");
                $('#available .bar-weight').css('top', 100-char.available + '%');
            }
        });

        // update bar-weight at beginning
        $attrSlider.siblings('.bar').find('.bar-weight').css("top", 100-char[AttrType[attr]] + "%");
    });

    $('.bar-slider button').click(function(event) {
        var attrDelta = $(this).hasClass('increase')?1:-1;
        var $slider = $(event.target).parent().slider();
        $slider.slider({value:($slider.slider('value')+attrDelta)});
    });

    $('.blockUI #char-name').change(function (event) {
        char.name = (<HTMLInputElement>event.currentTarget).value;
    });

    $('#char-creation-commands .ok').click(function() {
        char.name = char.name || 'bob';
        $.unblockUI();
        startNewGame(char);
    });
}

function splashScreenEvents() {
    $('#start-game').click(charCreation);
    $('#load-game').click(function () {

    });
    $('#overview').click(function () {

    });
}
