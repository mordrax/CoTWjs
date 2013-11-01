/// <reference path="../references.ts"/>
var GraphicsEngine = (function () {
    function GraphicsEngine() {
        var _this = this;
        this._canvas = ($('#world')[0]);
        this._ctx = this._canvas.getContext('2d');
        this._resources = {};
        this._loading = 0;
        this._centerPoint = new Point(0, 0);
        this.LoadResources();
        this.InitialiseScreen();
        this.InitialiseUI();

        Game.World.updatedEvent.add(function (entity) {
            _this.Draw(entity);
        });

        $(window).on('resize', function () {
            return _this.InitialiseScreen();
        });
    }
    GraphicsEngine.prototype.Draw = function (entity) {
        var sprite = entity.sprite;
        var location = entity.location;

        var canvasPos = new Point((location.position.X - this._centerPoint.X + this._canvasTileSize.X / 2) * TILE_SIZE, (location.position.Y - this._centerPoint.Y + this._canvasTileSize.Y / 2) * TILE_SIZE);
        if (entity.sprite.turn != 0) {
            this._ctx.save();
            this._ctx.translate(canvasPos.X + TILE_SIZE / 2, canvasPos.Y + TILE_SIZE / 2);
            this._ctx.rotate(entity.sprite.turn);
            this._ctx.translate(-canvasPos.X - TILE_SIZE / 2, -canvasPos.Y - TILE_SIZE / 2);
        }

        this._ctx.drawImage(this._resources[sprite.type], sprite.offset.x, sprite.offset.y, sprite.size.w, sprite.size.h, canvasPos.X, canvasPos.Y, sprite.size.w, sprite.size.h);

        if (entity.sprite.turn != 0) {
            this._ctx.restore();
        }
    };

    GraphicsEngine.prototype.UpdateCenter = function (point) {
        this._centerPoint = point;
    };

    GraphicsEngine.prototype.createImgElement = function (src) {
        var elm = document.createElement('img');
        elm.src = src;
        return elm;
    };

    GraphicsEngine.prototype.InitialiseScreen = function () {
        var screenSize = new Point($(window).width(), $(window).height());
        this._canvas.width = screenSize.X - 128;
        this._canvas.height = screenSize.Y - $('#file-menu').height() - $('#button-menu').height() - $('#messages').height() - $('.title').height() - 100;

        this._canvasTileSize = new Point(Math.floor(this._canvas.width / TILE_SIZE), Math.floor(this._canvas.height / TILE_SIZE));

        console.log('initialising screen');
    };

    GraphicsEngine.prototype.Clear = function () {
        this._ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);
    };

    GraphicsEngine.prototype.LoadResources = function () {
        this._resources[ResourceType.buildings_2x] = this.createImgElement('assets/resources/2x_buildings.png');
        this._resources[ResourceType.buildings_3x] = this.createImgElement('assets/resources/3x_buildings.png');
        this._resources[ResourceType.buildings_4x] = this.createImgElement('assets/resources/4x_buildings.png');
        this._resources[ResourceType.buildings_5x] = this.createImgElement('assets/resources/5x_buildings.png');
        this._resources[ResourceType.SpellEffects] = this.createImgElement('assets/resources/spell_effects.png');
        this._resources[ResourceType.DifficultyLevel] = this.createImgElement('assets/resources/difficulty_level.png');
        this._resources[ResourceType.Monsters] = this.createImgElement('assets/resources/monsters.png');
        this._resources[ResourceType.Items] = this.createImgElement('assets/resources/items.png');
        this._resources[ResourceType.Spells] = this.createImgElement('assets/resources/spells.png');
        this._resources[ResourceType.Tiles] = this.createImgElement('assets/resources/tiles.png');
        this._resources[ResourceType.buildings_1x] = this.createImgElement('assets/resources/1x_buildings.png');
    };

    GraphicsEngine.prototype.InitialiseUI = function () {
        var _this = this;
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
            _this.Screen(ScreenType.Main);
        });
        $('#menu-window-shop').click(function () {
            _this.Screen(ScreenType.Shop);
        });
        $('#menu-exit').click(function () {
            _this.Screen(ScreenType.Main);
        });
        $('#menu-sortpack').click(function () {
            $('#top-window').append('<div class="equipment"></div>');
        });
        $('#menu-nameobject').click(function () {
            $('#bottom-window').append('<div class="equipment"></div>');
        });
    };

    GraphicsEngine.prototype.Screen = function (screen) {
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

    GraphicsEngine.prototype.UpdateInventory = function (playerInventory, mainInventory, otherInventory) {
    };
    return GraphicsEngine;
})();
//# sourceMappingURL=GraphicsEngine.js.map