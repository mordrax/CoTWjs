/// <reference path="../references.ts"/>
/**
 * Represents the Model of the game. All game content will be part of the world and the View will draw the area of the
 * world that the player is in when something has changed in the world.
 */
class World {
    private _currentArea:MapType;
    private _areas:collections.Dictionary<MapType, Tile[][]>;
    //private _entities: collections.Dictionary<MapType, collections.Dictionary<string, Entity>>;
    private _entities : {[area:string]:{[id:string]:Entity}};
    private _tileFactory:TileFactory;
    private _buildingFactory:BuildingFactory;

    public updatedEvent:Signal;

    /**
     * World creation defaults to village _map
     * @param $el - Container element <background> for all tiles
     */
     constructor() {
        this.updatedEvent = new Signal();

        this._tileFactory = new TileFactory();
        this._buildingFactory = new BuildingFactory();

        this._currentArea = <MapType>MapType.VillageMap;

        this._entities = {};

        this.InitialiseArea(this._currentArea);
    }

    AddEntity(entity:Entity) {
        this._entities[entity.location.area] = this._entities[entity.location.area] || {}
        this._entities[entity.location.area][entity.id] = entity;
    }

    Initialise() {
        this.DispatchUpdatedEvent();
    }

    DispatchUpdatedEvent() {
        this._areas.getValue(this._currentArea).forEach(x => {
            (<Array>x).forEach(y=>{
                this.updatedEvent.dispatch(y);
            })
        });
        for (var k in this._entities[this._currentArea])
            this.updatedEvent.dispatch(this._entities[this._currentArea][k]);
    }

    Move(id:string, keycode:number) {
        var hero_entity = this._entities[this._currentArea][id];
        var loc = hero_entity.location;
        var dir = new Point(0, 0);
        switch (keycode) {
            case 37: //LEFT
                dir.X = -1;
                break;
            case 38: //UP
                dir.Y = -1;
                break;
            case 39: // RIGHT
                dir.X = 1;
                break;
            case 40: // DOWN
                dir.Y = 1;
                break;
            default:
                break;
        }

        var newLoc = new Point(loc.position.X + dir.X, loc.position.Y + dir.Y);
        var collision = false;

        for (var k in this._entities[this._currentArea]) {
            var entity = this._entities[this._currentArea][k];
            var id = entity.id;
            if (entity.type === EntityType.Actor) {
                if (entity.location.position.Equals(newLoc)) {
                    collision = true;
                    console.log('hit another actor: ' + id);
                }
            } else if (entity.type === EntityType.Building) {
                var building = (<Structure>entity);
                var structurePart = building.PointInStructure(newLoc);
                if (structurePart === StructurePart.Wall) {
                    collision = true;
                    console.log('hit building: ' + id);
                } else if (structurePart === StructurePart.Entry) {
                    if (building.StructureType() == StructureType.Gate_NS) {
                        var newMapLink = this.MapLink(new WorldCoordinates(this._currentArea, newLoc));
                        newLoc = newMapLink.position;
                        this._entities[this._currentArea][hero_entity.id] = hero_entity;
                        break;
                    }
                    console.log("You have entered: " + id);
                }
            }
        }

        if (collision === false) {
            hero_entity.location.position = newLoc;
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
                tiles[x][y] = this._tileFactory.Create(ASCII_MAPS[mapType][y][x], new WorldCoordinates(mapType, new Point(x,y)));
                if (x>0 && y>0) {
                 // Pass in west and north. Note: north = [x][y-1], west = [x-1][y], south = [x][y+1], east = [x+1][y]
                    tiles[x][y].DetermineRotation(tiles[x-1][y].id, tiles[x][y-1].id);
                }
            }
        }
        this._areas.setValue(mapType, tiles);

        this._entities[this._currentArea] = this._entities[this._currentArea] || {};
        //Initialise buildings for area
        AREA_STRUCTURES[mapType].forEach(
            (x:IStructure) => this._entities[this._currentArea][x.id] = this._buildingFactory.Create(x.type, x.id, x.location)
        );
    }

    /**
     * Called when a player moves to a point in the world, check if that location is a link
     * If yes, then change the map and send the new location of the player (on the new map) back
     */
    MapLink(currentLocation:WorldCoordinates):WorldCoordinates {
        var link:WorldCoordinates = null;

        MAP_TO_MAP.forEach((k:WorldCoordinates, v:WorldCoordinates) => {
            if (currentLocation.Equals(k)) {
                link = v;
            }
            if (currentLocation.Equals(v)) {
                link = k;
            }
        });

        // update the map
        if (link !== null) {
            this._currentArea = link.area;
            this.InitialiseArea(this._currentArea);
        }

        return link;
    }
}