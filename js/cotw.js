var world = new World(MAPS.villageMap);
var hero = new Player();

function render(drawMap) {
    if (drawMap) {
        for (var x = 0; x < world._tiles.length; x++) {
            for (var y = 0; y < world._tiles.length; y++) {
                world._tiles[x][y]._tile._turn = world.determineRotation(x, y, world._map);
                world._tiles[x][y].updatePosition(x, y);
            }
        }
    }
    hero._el.style["-webkit-transform"] = "translate3d(" + hero._x * TILE_SIZE + 'px,' + hero._y * TILE_SIZE + "px,0px) ";
    window.requestAnimationFrame(function () {
        render(false);
    });
}

function init(event) {
    world._$el = $("#background");
    world._el = world._$el.get(0);

    hero._$el = $("#hero");
    hero._el = hero._$el.get(0);

    render(true);
    $("body").css("display", "block");

    document.addEventListener("keyup", function (event) {
        update(event, hero);
    }, false);
}

function update(event, hero) {
    hero.update(event.keyCode);
}

addEventListener("load", init);
//@ sourceMappingURL=cotw.js.map
