/// <reference path="../references.ts"/>
/**
* Represents the Model of the game. All game content will be part of the world and the View will draw the area of the
* world that the player is in when something has changed in the world.
*/
var World = (function () {
    /**
    * World creation defaults to village _map
    * @param $el - Container element <background> for all tiles
    */
    function World() {
        this._currentArea = GameArea.Village;
        this._areas = {};
        this._entities = {};

        this.InitialiseArea(this._currentArea);
    }
    World.prototype.AddEntity = function (entity) {
        this._entities[entity.location.area] = this._entities[entity.location.area] || {};
        this._entities[entity.location.area][entity.id] = entity;

        if (entity instanceof Player) {
            this._hero = entity;
        }
    };

    World.prototype.RemoveEntity = function (entity) {
        Log(entity.id + ' is slain!');
        delete this._entities[entity.location.area][entity.id];
    };

    World.prototype.Draw = function () {
        Game.Graphics.Clear();

        this._areas[this._currentArea].forEach(function (x) {
            (x).forEach(function (y) {
                Game.Graphics.DrawEntity(y);
            });
        });
        for (var k in this._entities[this._currentArea])
            Game.Graphics.DrawEntity(this._entities[this._currentArea][k]);
    };

    World.prototype.MoveMonsters = function () {
        for (var k in this._entities[this._currentArea]) {
            var entity = this._entities[this._currentArea][k];
            if (entity instanceof Monster) {
                (entity).Move(this._hero.location.position);
            }
        }
    };

    World.prototype.TryMove = function (monsterId, dir) {
        var monsterEntity = this._entities[this._currentArea][monsterId];
        var loc = monsterEntity.location;
        var newLoc = new Point(loc.position.X + dir.X, loc.position.Y + dir.Y);

        if (newLoc.Equals(this._hero.location.position)) {
            monsterEntity.Attack(this._hero);
            return true;
        }

        for (var k in this._entities[this._currentArea]) {
            var entity = this._entities[this._currentArea][k];
            if (entity.type === EntityType.Actor) {
                if ((entity).location.position.Equals(newLoc)) {
                    return false;
                }
            } else if (entity.type === EntityType.Building) {
                if ((entity).PointInStructure(newLoc) != StructurePart.None) {
                    return false;
                }
            }
        }

        // nothing in the monster's way - move to new location
        monsterEntity.location.position = newLoc;
        return true;
    };

    World.prototype.MoveHero = function (heroId, dir) {
        var heroEntity = this._entities[this._currentArea][heroId];
        var loc = heroEntity.location;
        var newLoc = new Point(loc.position.X + dir.X, loc.position.Y + dir.Y);
        var collision = false;

        for (var k in this._entities[this._currentArea]) {
            var entity = this._entities[this._currentArea][k];
            if (entity.type === EntityType.Actor) {
                var target = (entity);
                if (entity.location.position.Equals(newLoc)) {
                    collision = true;
                    heroEntity.Attack(target);
                }
            } else if (entity.type === EntityType.Building) {
                var building = (entity);
                var structurePart = building.PointInStructure(newLoc);
                if (structurePart === StructurePart.Wall) {
                    collision = true;
                    Log('Ouch! You walked into a wall belonging to ' + entity.id);
                } else if (structurePart === StructurePart.Entry) {
                    if (building.structureType == StructureType.Link) {
                        var newMapLink = this.MapLink(new WorldCoordinates(this._currentArea, newLoc));
                        newLoc = newMapLink.position;
                        this._entities[this._currentArea][heroEntity.id] = heroEntity;
                        break;
                    } else if (building.structureType == StructureType.Shop) {
                        Game.Graphics.Screen(ScreenType.Shop);
                        Game.Graphics.ShowInventory(heroEntity.inventory, building.inventory.wares, building.id);
                    }
                    Log("You see " + entity.id + ".");
                }
            }
        }

        if (collision === false) {
            heroEntity.location.position = newLoc;
            Game.Graphics.UpdateCenter(newLoc);
        }

        //loop through monsters, move them
        this.MoveMonsters();

        this.Draw();
    };

    /**
    * Populates each area with tiles, done once on construction
    */
    World.prototype.InitialiseArea = function (mapType) {
        var _this = this;
        // maps a GameArea to a 2D array of tiles which represents the area
        var tiles = [];

        for (var y = 0; y < ASCII_MAPS[mapType].length; y++) {
            for (var x = 0; x < ASCII_MAPS[mapType][y].length; x++) {
                if (y === 0) {
                    tiles[x] = new Array();
                }
                tiles[x][y] = new Tile(CoTWData.Tiles[ASCII_MAPS[mapType][y][x]], new WorldCoordinates(mapType, new Point(x, y)));
                if (x > 0 && y > 0) {
                    // Pass in west and north. Note: north = [x][y-1], west = [x-1][y], south = [x][y+1], east = [x+1][y]
                    tiles[x][y].DetermineRotation(tiles[x - 1][y].id, tiles[x][y - 1].id);
                }
            }
        }
        this._areas[mapType] = tiles;

        this._entities[this._currentArea] = this._entities[this._currentArea] || {};

        //Initialise buildings for area
        AREA_STRUCTURES[mapType].forEach(function (x) {
            return _this._entities[_this._currentArea][x.id] = new Structure(x);
        });
    };

    World.prototype.PrettyPrint = function (type) {
        switch (type) {
            case GameArea.Farm:
                return "Farm";
            case GameArea.Village:
                return "Village";
            case GameArea.MinesLv1:
                return "Mines: Level 1";
            default:
                return "An unknown spooky area unintended by the developer!";
        }
    };

    /**
    * Called when a player moves to a point in the world, check if that location is a link
    * If yes, then change the map and send the new location of the player (on the new map) back
    */
    World.prototype.MapLink = function (currentLocation) {
        var link = null;

        MAP_TO_MAP.forEach(function (x) {
            if (currentLocation.Equals(x.LinkA)) {
                link = x.LinkB;
            }
            if (currentLocation.Equals(x.LinkB)) {
                link = x.LinkA;
            }
        });

        if (link !== null) {
            this._currentArea = link.area;
            this.InitialiseArea(this._currentArea);
            Log('You have arrived at the ' + this.PrettyPrint(this._currentArea));
        }

        return link;
    };

    World.prototype.PickFromGround = function () {
        var pos = this._hero.location.position;
        Game.Graphics.ShowInventory(this._hero.inventory, (this._areas[this._currentArea][pos.X][pos.Y]).ground, "Ground");
    };
    return World;
})();
//# sourceMappingURL=world.js.map
