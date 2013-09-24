/// <reference path="../references.ts"/>
/**
 * Represents the Model of the game. All game content will be part of the world and the View will draw the area of the
 * world that the player is in when something has changed in the world.
 */
class World {
    private _currentArea:MapType;
    private _areas:collections.Dictionary<MapType, Tile[][]>;
    private _entities:collections.Dictionary<string, Entity>;
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
        // maps a MapType to a 2D array of tiles which represents the area
        this._areas = new collections.Dictionary<MapType, Tile[][]>();

        this._entities = new collections.Dictionary<string, Entity>();

        this.InitialiseArea(this._currentArea);
    }

    AddEntity(entity:Entity) {
        this._entities.setValue(entity.id, entity);
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
        this._entities.forEach((k,v) => this.updatedEvent.dispatch(v));
    }

    Move(id:string, keycode:number) {
        var entity = this._entities.getValue(id);
        var loc = entity.location;
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

        this._entities.forEach((id:string,entity:Entity) => {
            if (entity.type === EntityType.Actor) {
                if (entity.location.position.Equals(newLoc)) {
                    collision = true;
                    console.log('hit another actor: ' + id);
                }
            } else if (entity.type === EntityType.Building) {
                var structurePart = (<Structure>entity).PointInStructure(newLoc);
                if (structurePart === StructurePart.Wall) {
                    collision = true;
                    console.log('hit building: ' + id);
                } else if (structurePart === StructurePart.Entry) {
                    console.log('hit entry of building: ' + id);
                }
            }
        });

        if (collision === false) {
            entity.location.position = newLoc;
            Game.Graphics.UpdateCenter(newLoc);
        }

        Game.Graphics.Clear();
        this.DispatchUpdatedEvent();

        /* TODO: Fix up map link
         var link = this._world.MapLink(newPos);
         if (link !== null) {
         actor.moveTo(link.Coord);
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
        var tiles = new Array<Array<Tile>>();

        // Initialise tiles for area
        for (var y = 0; y < ASCII_MAPS[mapType].length; y++) {
            for (var x = 0; x < ASCII_MAPS[mapType][y].length; x++) {
                if (y === 0) {
                    tiles[x] = new Array<Tile>();
                }
                tiles[x][y] = this._tileFactory.Create(ASCII_MAPS[mapType][y][x]);
                if (x>0 && y>0) {
                 // Pass in west and north. Note: north = [x][y-1], west = [x-1][y], south = [x][y+1], east = [x+1][y]
                    tiles[x][y].DetermineRotation(tiles[x-1][y].id, tiles[x][y-1].id);
                }
                tiles[x][y].location = new WorldCoordinates(mapType, new Point(x, y));
            }
        }
        this._areas.setValue(mapType, tiles);

        //Initialise buildings for area
        AREA_STRUCTURES[mapType].forEach(
            (x:IStructure) => this._entities.setValue(x.id, this._buildingFactory.Create(x.type, x.id, x.location))
        )
    }

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
    MapLink(point:Point):MapLink {
        var link:MapLink = null;
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
    }
}