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
        this.updatedEvent = new Signal();

        this._tileFactory = new TileFactory();
        this._buildingFactory = new BuildingFactory();

        this._currentArea = MapType.VillageMap;

        // maps a MapType to a 2D array of tiles which represents the area
        this._areas = new collections.Dictionary();

        this._entities = new collections.Dictionary();

        this.InitialiseArea(this._currentArea);
    }
    World.prototype.AddEntity = function (entity) {
        this._entities.setValue(entity.id, entity);
    };

    World.prototype.Initialise = function () {
        this.DispatchUpdatedEvent();
    };

    World.prototype.DispatchUpdatedEvent = function () {
        var _this = this;
        this._areas.getValue(this._currentArea).forEach(function (x) {
            (x).forEach(function (y) {
                _this.updatedEvent.dispatch(y);
            });
        });
        this._entities.forEach(function (k, v) {
            return _this.updatedEvent.dispatch(v);
        });
    };

    World.prototype.Move = function (id, keycode) {
        var entity = this._entities.getValue(id);
        var loc = entity.location;
        var dir = new Point(0, 0);
        switch (keycode) {
            case 37:
                dir.X = -1;
                break;
            case 38:
                dir.Y = -1;
                break;
            case 39:
                dir.X = 1;
                break;
            case 40:
                dir.Y = 1;
                break;
            default:
                break;
        }

        var newLoc = new Point(loc.position.X + dir.X, loc.position.Y + dir.Y);
        var collision = false;

        this._entities.forEach(function (id, entity) {
            if (entity.type === EntityType.Actor) {
                if (entity.location.position.Equals(newLoc)) {
                    collision = true;
                    console.log('hit another actor: ' + id);
                }
            } else if (entity.type === EntityType.Building) {
                var building = (entity);
                var structurePart = building.PointInStructure(newLoc);
                if (structurePart === StructurePart.Wall) {
                    collision = true;
                    console.log('hit building: ' + id);
                } else if (structurePart === StructurePart.Entry) {
                    console.log("You have entered: " + id);
                }
            }
        });

        if (collision === false) {
            entity.location.position = newLoc;
            Game.Graphics.UpdateCenter(newLoc);
        }

        Game.Graphics.Clear();
        this.DispatchUpdatedEvent();
        /*
        var link = this._world.MapLink(newPos);
        if (link !== null) {
        entity.location = new WorldCoordinates()
        return;
        }
        */
        //TODO: Check collision
        // collision with monster
        // collision with building door
        // collision with map entry/exit
    };

    /**
    * Populates each area with tiles, done once on construction
    */
    World.prototype.InitialiseArea = function (mapType) {
        var _this = this;
        var tiles = new Array();

        for (var y = 0; y < ASCII_MAPS[mapType].length; y++) {
            for (var x = 0; x < ASCII_MAPS[mapType][y].length; x++) {
                if (y === 0) {
                    tiles[x] = new Array();
                }
                tiles[x][y] = this._tileFactory.Create(ASCII_MAPS[mapType][y][x]);
                if (x > 0 && y > 0) {
                    // Pass in west and north. Note: north = [x][y-1], west = [x-1][y], south = [x][y+1], east = [x+1][y]
                    tiles[x][y].DetermineRotation(tiles[x - 1][y].id, tiles[x][y - 1].id);
                }
                tiles[x][y].location = new WorldCoordinates(mapType, new Point(x, y));
            }
        }
        this._areas.setValue(mapType, tiles);

        //Initialise buildings for area
        AREA_STRUCTURES[mapType].forEach(function (x) {
            return _this._entities.setValue(x.id, _this._buildingFactory.Create(x.type, x.id, x.location));
        });
    };

    /* TODO: move to graphics engine
    Draw(ctx:CanvasRenderingContext2D) {
    for (var x = 0; x < this.CurrentTileSet().length; x++) {
    for (var y = 0; y < this.CurrentTileSet()[0].length; y++) {
    this.CurrentTileSet()[x][y].Draw(ctx);
    }
    }
    
    this.CurrentStructureSet().forEach((x:Structure)=> {
    x.Draw(ctx);
    });
    
    }*/
    /**
    * Called when a player moves to a point in the world, check if that location is a link
    * If yes, then change the map and send the new location of the player (on the new map) back
    */
    World.prototype.MapLink = function (point) {
        var link = null;

        /*       TODO: fix map link
        
        MAP_TO_MAP.forEach((k:MapLink, v:MapLink) => {
        if ((this._currentArea === k.MapName) && point.Equals(k.Coord)) {
        link = v;
        }
        if ((this._currentArea === v.MapName) && point.Equals(v.Coord)) {
        link = k;
        }
        });
        
        // update the map
        if (link !== null) {
        this._currentArea = link.MapName;
        this.LoadMap(this._currentArea);
        }
        */
        return link;
    };
    return World;
})();
//# sourceMappingURL=world.js.map
