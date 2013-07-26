var world = new World(MAPS.villageMap);
var hero = new Player();

function render(drawMap) {
    if (drawMap) {
        for (var x = 0; x < world.tiles.length; x++) {
            for (var y = 0; y < world.tiles[x].length; y++) {
                world.tiles[x][y].updatePosition(x, y);
            }
        }
    }
    hero.el.style["-webkit-transform"] = "translate3d(" + hero.x * TILE_SIZE + 'px,' + hero.y * TILE_SIZE + "px,0px) ";
    window.requestAnimationFrame(function () {
        render(false);
    });
}

function init(event) {
    world.$el = $("#background");
    world.el = world.$el.get(0);

    hero.$el = $("#hero");
    hero.el = hero.$el.get(0);

    render(true);
    $("body").css("display", "block");

    document.addEventListener("keyup", function (event) {
        update(event, hero);
    }, false);
}

function update(event, hero) {
    hero.update(event.keyCode);
}

function isPhoneGap() {
    return ((cordova || PhoneGap || phonegap) && /^file:\/{3}[^\/]/i.test(document.location.href) && /ios|iphone|ipod|ipad|android/i.test(navigator.userAgent)) || window.tinyHippos;
}

if (isPhoneGap()) {
    document.addEventListener("deviceready", init);
} else {
    document.addEventListener("load", init);
}
//@ sourceMappingURL=cotw.js.map
