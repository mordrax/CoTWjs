/// <reference path="../references.ts"/>
/**
 * Represents the Model of the game. All game content will be part of the world and the View will draw the area of the
 * world that the player is in when something has changed in the world.
 */
class World {
    private _currentArea:MapType;
    private _areas:collections.Dictionary<MapType, Tile[][]>;
    //private _entities: collections.Dictionary<MapType, collections.Dictionary<string, Entity>>;
    private _entities:{[area:string]:{[id:string]:Entity}};
    private _hero:Player;

    public updatedEvent:Signal;

    /**
     * World creation defaults to village _map
     * @param $el - Container element <background> for all tiles
     */
        constructor() {
        this.updatedEvent = new Signal();

        this._currentArea = <MapType>MapType.VillageMap;

        this._entities = {};

        this.InitialiseArea(this._currentArea);
    }

    AddEntity(entity:Entity) {
        this._entities[entity.location.area] = this._entities[entity.location.area] || {};
        this._entities[entity.location.area][entity.id] = entity;

        if (entity instanceof Player) {
            this._hero = <Player>entity;
        }
    }

    RemoveEntity(entity:Entity) {
        Log(entity.id + ' is slain!');
        delete this._entities[entity.location.area][entity.id];
    }

    Initialise() {
        this.DispatchUpdatedEvent();
    }

    /**
     * Send out update events for all entities and tiles of the current area of the world
     * @constructor
     */
        DispatchUpdatedEvent() {
        this._areas.getValue(this._currentArea).forEach(x => {
            (<Array>x).forEach(y=> {
                this.updatedEvent.dispatch(y);
            })
        });
        for (var k in this._entities[this._currentArea])
            this.updatedEvent.dispatch(this._entities[this._currentArea][k]);
    }

    private MoveMonsters() {
        for (var k in this._entities[this._currentArea]) {
            var entity = this._entities[this._currentArea][k];
            if (entity instanceof Monster) {
                (<Monster>entity).Move(this._hero.location.position);
            }
        }
    }

    TryMove(monsterId:string, dir:Point):boolean {
        var monsterEntity = <Monster>this._entities[this._currentArea][monsterId];
        var loc = monsterEntity.location;
        var newLoc = new Point(loc.position.X + dir.X, loc.position.Y + dir.Y);

        // if monster is next to hero, hit it instead of trying to move
        if (newLoc.Equals(this._hero.location.position)) {
            monsterEntity.Attack(this._hero);
            return true
        }

        //check hero and obstruction free
        for (var k in this._entities[this._currentArea]) {
            var entity = this._entities[this._currentArea][k];
            if (entity.type === EntityType.Actor) {
                // monster = invalid move
                // can never be hero, handled above
                if ((<Actor>entity).location.position.Equals(newLoc)) {
                    return false;
                }
            } else if (entity.type === EntityType.Building) {
                if ((<Structure>entity).PointInStructure(newLoc) != StructurePart.None) {
                    return false; // building = invalid move
                }
            }
        }
        // nothing in the monster's way - move to new location
        monsterEntity.location.position = newLoc;
        return true;
    }

    MoveHero(heroId:string, dir:Point) {
        var heroEntity = <Player>this._entities[this._currentArea][heroId];
        var loc = heroEntity.location;
        var newLoc = new Point(loc.position.X + dir.X, loc.position.Y + dir.Y);
        var collision = false;

        for (var k in this._entities[this._currentArea]) {
            var entity = this._entities[this._currentArea][k];
            if (entity.type === EntityType.Actor) {
                var target = (<Actor>entity);
                if (entity.location.position.Equals(newLoc)) {
                    collision = true;
                    heroEntity.Attack(target);
                }
            } else if (entity.type === EntityType.Building) {
                var building = (<Structure>entity);
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

        Game.Graphics.Clear();
        this.DispatchUpdatedEvent();

    }

    /**
     * Populates each area with tiles, done once on construction
     */
    private InitialiseArea(mapType:MapType) {
        // maps a MapType to a 2D array of tiles which represents the area
        this._areas = new collections.Dictionary<MapType, Tile[][]>();
        var tiles = new Array<Array<Tile>>();

        // Initialise tiles for area
        for (var y = 0; y < ASCII_MAPS[mapType].length; y++) {
            for (var x = 0; x < ASCII_MAPS[mapType][y].length; x++) {
                if (y === 0) {
                    tiles[x] = new Array<Tile>();
                }
                tiles[x][y] = new Tile(CoTWData.Tiles[ASCII_MAPS[mapType][y][x]], new WorldCoordinates(mapType, new Point(x, y)));
                if (x > 0 && y > 0) {
                    // Pass in west and north. Note: north = [x][y-1], west = [x-1][y], south = [x][y+1], east = [x+1][y]
                    tiles[x][y].DetermineRotation(tiles[x - 1][y].id, tiles[x][y - 1].id);
                }
            }
        }
        this._areas.setValue(mapType, tiles);

        this._entities[this._currentArea] = this._entities[this._currentArea] || {};
        //Initialise buildings for area
        AREA_STRUCTURES[mapType].forEach(
            (x:IStructure) => this._entities[this._currentArea][x.id] = new Structure(x)
        );
    }

    private PrettyPrint(type:MapType) {
        switch (type) {
            case MapType.FarmMap:
                return "Farm";
            case MapType.VillageMap:
                return "Village";
            case MapType.MinesLv1:
                return "Mines: Level 1";
            default:
                return "An unknown spooky area unintended by the developer!";
        }
    }

    /**
     * Called when a player moves to a point in the world, check if that location is a link
     * If yes, then change the map and send the new location of the player (on the new map) back
     */
        MapLink(currentLocation:WorldCoordinates):WorldCoordinates {
        var link:WorldCoordinates = null;

        MAP_TO_MAP.forEach((x:IMapLink) => {
            if (currentLocation.Equals(x.LinkA)) {
                link = x.LinkB;
            }
            if (currentLocation.Equals(x.LinkB)) {
                link = x.LinkA;
            }
        });

        // update the map
        if (link !== null) {
            this._currentArea = link.area;
            this.InitialiseArea(this._currentArea);
            Log('You have arrived at the ' + this.PrettyPrint(this._currentArea));
        }

        return link;
    }

    public PickFromGround() {
        var pos = this._hero.location.position;
        Game.Graphics.ShowInventory(this._hero.inventory, (<Tile>this._areas.getValue(this._currentArea)[pos.X][pos.Y]).ground, "Ground");
    }
}