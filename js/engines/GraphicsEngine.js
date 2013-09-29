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

        Game.World.updatedEvent.add(function (entity) {
            var sprite = entity.sprite;
            var location = entity.location;

            var canvasPos = new Point((location.position.X - _this._centerPoint.X + _this._canvasTileSize.X / 2) * TILE_SIZE, (location.position.Y - _this._centerPoint.Y + _this._canvasTileSize.Y / 2) * TILE_SIZE);
            if (entity.sprite.turn != 0) {
                _this._ctx.save();
                _this._ctx.translate(canvasPos.X + TILE_SIZE / 2, canvasPos.Y + TILE_SIZE / 2);
                _this._ctx.rotate(entity.sprite.turn);
                _this._ctx.translate(-canvasPos.X - TILE_SIZE / 2, -canvasPos.Y - TILE_SIZE / 2);
            }

            _this._ctx.drawImage(_this._resources[sprite.type], sprite.offset.x, sprite.offset.y, sprite.size.w, sprite.size.h, canvasPos.X, canvasPos.Y, sprite.size.w, sprite.size.h);

            if (entity.sprite.turn != 0) {
                _this._ctx.restore();
            }
        });

        $(window).on('resize', function () {
            return _this.InitialiseScreen();
        });
    }
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
        this._canvas.height = screenSize.Y - 256;

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
        this._resources[ResourceType.Objects] = this.createImgElement('assets/resources/items.png');
        this._resources[ResourceType.Spells] = this.createImgElement('assets/resources/spells.png');
        this._resources[ResourceType.Tiles] = this.createImgElement('assets/resources/tiles.png');
        this._resources[ResourceType.buildings_1x] = this.createImgElement('assets/resources/1x_buildings.png');
    };
    return GraphicsEngine;
})();
//# sourceMappingURL=GraphicsEngine.js.map
